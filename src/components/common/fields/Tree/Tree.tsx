import { Tree as AntdTree, TreeProps } from 'antd'
import { useControllable } from '../../../../hooks'
import cloneDeep from 'lodash/cloneDeep'
import React from 'react'

export type TreeNode = {
  key: string
  title: string
  children?: TreeNode[]
  rootPath?: string
  [key: string]: any
}

export type Props = Pick<TreeProps, 'className' | 'draggable' | 'titleRender' | 'onExpand'> & {
  value?: TreeNode[]
  defaultValue?: TreeNode[]
  onChange?: (treeData: TreeNode[]) => void
  onBeforeChange?: (treeData: TreeNode[], dragNode: TreeNode, dragParentNode?: TreeNode) => void
  onAfterChange?: (treeData: TreeNode[], dragNode: TreeNode, dragParentNode?: TreeNode) => void
}

const Tree = ({ value: valueProp, onChange, defaultValue, onBeforeChange, onAfterChange, ...restProps }: Props) => {
  const [value = [], setValue] = useControllable({ value: valueProp, onChange: onChange as any, defaultValue })

  const handleDrop: TreeProps['onDrop'] = info => {
    const dropKey = info.node.key as string
    const dragKey = info.dragNode.key as string
    const dropPos = info.node.pos.split('-') //
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: TreeNode[],
      keyOrFinder: string | ((data: TreeNode[]) => void),
      callback: (item: TreeNode, index: number, arr: TreeNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (typeof keyOrFinder === 'string') {
          if (data[i].key === keyOrFinder) {
            return callback(data[i], i, data)
          }
        } else {
          if ((keyOrFinder as any)(data)) {
            return callback(data[i], i, data)
          }
        }
        if (data[i].children) {
          loop(data[i].children!, keyOrFinder, callback)
        }
      }
    }
    const cloneValue = cloneDeep(value)

    // Find dragObject
    let dragObj: TreeNode
    loop(cloneValue, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(cloneValue, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(cloneValue, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar: TreeNode[] = []
      let i = -1

      loop(cloneValue, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj!)
      } else {
        ar.splice(i + 1, 0, dragObj!)
      }
    }

    let dragParentObj
    loop(
      cloneValue,
      data => data.find(({ children }) => children?.some(({ key }) => key === dragKey)),
      item => {
        dragParentObj = item
      }
    )
    onBeforeChange?.(cloneValue, dragObj!, dragParentObj)
    setValue(cloneValue)
    onAfterChange?.(cloneValue, dragObj!, dragParentObj)
  }

  return <AntdTree {...restProps} onDrop={handleDrop} treeData={value} />
}

export default Tree
