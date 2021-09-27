import React from 'react'
import { RegisterOptions, useController, useFormContext } from 'react-hook-form'
import { ClassName } from '../../../../types'
import get from 'lodash/get'

export type BaseFieldProps = ClassName & {
  rules?: RegisterOptions
  name: string
  valueAs?: (value: any) => any
  changeAs?: (value: any) => any
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  defaultValue?: any
  value?: any
  inputClassName?: string
}

export type Props<T> = BaseFieldProps & {
  component: React.ComponentType<T>
} & T

const Field = <T,>({
  component,
  name,
  rules,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  defaultValue,
  value: valueProp,
  valueAs,
  changeAs,
  className,
  inputClassName,
  ...restProps
}: Props<T>) => {
  const Component = component

  const {
    formState: { errors },
    setValue
  } = useFormContext()

  const {
    field: { onChange, onBlur, value, ref, ...restField }
  } = useController({ name, rules })

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (value: any) => {
    if (changeAs) {
      const transformedValue = changeAs(value)

      debugger

      onChange(transformedValue)
      onChangeProp?.(transformedValue)

      return
    }

    onChange(value)
    onChangeProp?.(value)
  }

  const handleBlur: React.FocusEventHandler<HTMLElement> = e => {
    onBlur()
    onBlurProp?.(e)
  }

  const resolveValue = () => {
    if (valueAs) return valueAs(value)

    if (rules?.valueAsNumber) {
      return +value
    }

    if (rules?.valueAsDate) {
      return new Date(value)
    }

    return value
  }

  const errorMessage = get(errors, name)?.message

  return (
    <div className={className}>
      <Component
        onChange={handleChange}
        onBlur={handleBlur}
        value={resolveValue()}
        defaultValue={defaultValue}
        className={inputClassName}
        {...restField}
        {...(restProps as any)}
      />
      {errorMessage && <p className='text-red-600 mt-1'>{errorMessage}</p>}
    </div>
  )
}

export default Field
