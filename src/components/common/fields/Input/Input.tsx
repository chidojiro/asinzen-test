import { Input as AntdInput, InputProps } from 'antd'

export type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> &
  Pick<InputProps, 'size' | 'allowClear'>

const Input = (props: Props) => {
  return <AntdInput {...(props as any)} />
}

export default Input
