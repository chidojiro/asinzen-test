import React from 'react'
import { Select as BaseSelect, SelectProps } from '../../..'
import Field, { BaseFieldProps } from '../Field'

export type Props<T> = Omit<BaseFieldProps, keyof SelectProps> & SelectProps<T>

const Select = <T,>(props: Props<T>) => {
  return <Field component={BaseSelect} {...(props as any)} />
}

export default Select
