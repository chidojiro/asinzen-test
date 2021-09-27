import React from 'react'
import useSWR from 'swr'
import { UserApis } from '../apis'

const useUsers = () => {
  const { data, ...restSwrReturn } = useSWR('/users', () => UserApis.getList())

  return React.useMemo(() => ({ ...restSwrReturn, data: data || [] }), [data, restSwrReturn])
}

export default useUsers
