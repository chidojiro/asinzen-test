import React from 'react'
import { Tree as BaseTree, TreeProps } from '../../..'
import Field, { BaseFieldProps } from '../Field'

export type Props = Omit<BaseFieldProps, keyof TreeProps> & TreeProps

const Tree = (props: Props) => {
  return <Field component={BaseTree} {...(props as any)} />
}

export default Tree
