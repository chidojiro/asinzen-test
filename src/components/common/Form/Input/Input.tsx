import React from 'react'
import { Input as BaseInput, InputProps } from '../../..'
import Field, { BaseFieldProps } from '../Field'

export type Props = Omit<BaseFieldProps, keyof InputProps> & InputProps

const Input = (props: Props) => {
  return <Field component={BaseInput} {...(props as any)} />
}

export default Input
