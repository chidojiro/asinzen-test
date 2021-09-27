import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons'
import { Button, Empty } from 'antd'
import { cloneDeep } from 'lodash'
import React from 'react'
import { useWatch } from 'react-hook-form'
import { v4 as UUID } from 'uuid'
import { Card, Form, TreeSelect } from '../../../components'
import { Id, SubFolder } from '../../../types'
import { TreeNode } from '../../common'
import CreateForm from '../CreateForm'

type Props = {
  parentId: Id
}

const Tree = ({ parentId }: Props) => {
  const [expandedNodeKey, setExpandedNodeKeys] = React.useState<string[]>([])
  const [newFolderIds, setNewFolderIds] = React.useState<string[]>([])
  const [folderSearch, setFolderSearch] = React.useState('')

  // reset component internal information after select another root folder
  React.useEffect(() => {
    setExpandedNodeKeys([])
    setNewFolderIds([])
    setFolderSearch('')
  }, [parentId])

  const folderTree = useWatch({ name: 'subFolders' }) as TreeNode[]

  const handleAddNewFolderForm = () => {
    setNewFolderIds(prev => [...prev, UUID()])
  }

  const removeNewFolder = (removedIdx: number) => {
    setNewFolderIds(prev => prev.filter((_, idx) => idx !== removedIdx))
  }

  if (!parentId)
    return (
      <Card className='col-span-4'>
        <Empty />
      </Card>
    )

  const handleTreeBeforeChange = (treeData: TreeNode[], dragNode: TreeNode, dragParentNode?: TreeNode) => {
    const adjustVisibleTo = (node: TreeNode, visibleTo: SubFolder['visibleTo']) => {
      node.visibleTo = visibleTo

      node.children?.forEach(node => {
        adjustVisibleTo(node, visibleTo)
      })
    }

    if (dragParentNode) {
      adjustVisibleTo(dragNode, dragParentNode.visibleTo)
    }
  }

  const getSubFolderDetailsFromPath = (treeData: TreeNode, path: string): TreeNode => {
    if (!path) return treeData

    const pathSegments = path.split('/')

    const nearestSubTree = treeData.children!.find(({ title }) => title === pathSegments[0])!

    if (pathSegments.length === 1) return nearestSubTree

    return getSubFolderDetailsFromPath(nearestSubTree, pathSegments.slice(1).join('/'))
  }

  const mergeSubTreeToRoot = (toBeMergedTree: TreeNode[]): TreeNode[] => {
    if (!folderSearch) return toBeMergedTree

    const cloneFolderTree = cloneDeep(folderTree)

    const parentNode = getSubFolderDetailsFromPath({ children: cloneFolderTree } as TreeNode, folderSearch)

    parentNode.children = toBeMergedTree

    return cloneFolderTree
  }

  return (
    <Card className='col-span-4'>
      <div className='flex justify-between mb-5'>
        <TreeSelect
          value={folderSearch}
          onChange={v => setFolderSearch(v)}
          className='w-full mr-5'
          allowClear
          showSearch
          treeData={folderTree}
          treeDefaultExpandAll
        />
        <Button type='link' onClick={handleAddNewFolderForm}>
          Add new folder
        </Button>
      </div>
      <Card>
        {newFolderIds.map((id, idx) => (
          <CreateForm key={id} id={id} onDeleteClick={() => removeNewFolder(idx)} onSave={() => removeNewFolder(idx)} />
        ))}
        <Form.Tree
          name='subFolders'
          draggable
          onExpand={keys => setExpandedNodeKeys(keys as string[])}
          titleRender={node => (
            <div className='flex items-center'>
              {expandedNodeKey.includes(node.key as string) ? (
                <FolderOpenOutlined className='mr-2 text-2xl' />
              ) : (
                <FolderOutlined className='mr-2 text-2xl' size={25} />
              )}
              <div>
                <p>{node.title}</p>
                <p className='text-sm text-gray-500'>{(node as any).visibleTo}</p>
              </div>
            </div>
          )}
          onBeforeChange={handleTreeBeforeChange}
          valueAs={treeData => getSubFolderDetailsFromPath({ children: treeData } as TreeNode, folderSearch).children}
          changeAs={toBeMergedTree => mergeSubTreeToRoot(toBeMergedTree)}
        />
      </Card>
    </Card>
  )
}

export default Tree
