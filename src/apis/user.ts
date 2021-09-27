import { User } from '../types'
import { v4 as UUID } from 'uuid'

const mockUsers: User[] = new Array(5).fill(null).map((_, idx) => ({ id: UUID(), name: `user-${idx}` }))

const getList = async () => {
  return mockUsers
}

const UserApis = {
  getList
}

export default UserApis
