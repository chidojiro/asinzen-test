import { TreeSelect as AntdTreeSelect, TreeSelectProps } from 'antd'

type TreeSelectNode<T> = { key: string; title: string; children?: TreeSelectNode<T>[] }

type Props<T = any> = Pick<
  TreeSelectProps<T>,
  'showSearch' | 'value' | 'onChange' | 'onBlur' | 'treeDefaultExpandAll' | 'className' | 'allowClear'
> & {
  treeData?: TreeSelectNode<T>[]
}

const { TreeNode } = AntdTreeSelect

const TreeSelect = <T,>({ treeData = [], ...restProps }: Props<T>) => {
  const renderTree = (nodes: TreeSelectNode<T>[], pathPrefix: string) => {
    return nodes.map(node => {
      const { title, children } = node
      const path = pathPrefix ? `${pathPrefix}/${title}` : title

      return (
        <TreeNode value={path} title={title} key={path}>
          {!!children?.length && renderTree(children, path)}
        </TreeNode>
      )
    })
  }

  return <AntdTreeSelect {...restProps}>{renderTree(treeData, '')}</AntdTreeSelect>
}

export default TreeSelect
