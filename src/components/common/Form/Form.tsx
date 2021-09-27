import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

import Select from './Select'
import Tree from './Tree'
import Input from './Input'

type Props<T> = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
  children: React.ReactNode
  onSubmit?: SubmitHandler<T>
  methods: UseFormReturn<T>
}

const Form = <TFieldValues extends FieldValues>({ children, onSubmit, methods, ...props }: Props<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

Form.Select = Select
Form.Tree = Tree
Form.Input = Input

export default Form
