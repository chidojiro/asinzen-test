import { Select as AntdSelect, SelectProps } from 'antd'
import { Children } from '../../../../types'

export type OptionProps = Children & {
  value: string
}

const Option = (props: OptionProps) => {
  return <AntdSelect.Option {...props} />
}

export type Props<T = any> = Pick<
  SelectProps<T>,
  'className' | 'value' | 'onChange' | 'children' | 'defaultValue' | 'mode' | 'placeholder'
>

const Select = <T,>(props: Props<T>) => {
  return <AntdSelect {...(props as any)} />
}

Select.Option = Option

export default Select
