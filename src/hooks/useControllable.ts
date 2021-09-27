import React from 'react'

type UseControllableProps<T> = {
  value?: T
  onChange?: (value: T, ...args: [any]) => void
  defaultValue: T
}

function useControllable<T>({ value: valueProp, onChange, defaultValue }: UseControllableProps<T>): any {
  const isControlled = valueProp !== undefined && valueProp !== null

  const [value, setValue] = React.useState(defaultValue)

  if (isControlled) return [valueProp, onChange]

  return [value, setValue]
}

export default useControllable
