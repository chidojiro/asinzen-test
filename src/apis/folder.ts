import { RootFolder } from './../types/folder'
import { Id } from './../types/common'
import { SubFolder } from './../types'
import { PromiseUtils } from '../utils'
import { v4 as UUID } from 'uuid'

const mockSubFolders: SubFolder[] = new Array(5)
  .fill(null)
  .map((_, idx) => ({ key: UUID(), title: `sub-folder-${idx}`, visibleTo: 'Visible to Everyone' } as SubFolder))
const mockRootFolders: RootFolder[] = new Array(5)
  .fill(null)
  .map((_, idx) => ({ key: UUID(), title: `root-folder-${idx}` }))

// use localStorage as database
const LS_SUB_FOLDERS_KEY = 'LS_SUB_FOLDERS_KEY'
const LS_ROOT_FOLDERS_KEY = 'LS_ROOT_FOLDERS_KEY'

// sleep 500ms to simulate an acutal api

const getSubList = async (id: string): Promise<SubFolder[]> => {
  await PromiseUtils.sleep(500)

  try {
    return JSON.parse(localStorage.getItem(LS_SUB_FOLDERS_KEY + id) || '')
  } catch {
    return mockSubFolders
  }
}

const getRootList = async (): Promise<RootFolder[]> => {
  await PromiseUtils.sleep(500)

  try {
    const folders = JSON.parse(localStorage.getItem(LS_ROOT_FOLDERS_KEY) || '') as SubFolder[]

    return folders.map(({ children: _, ...rest }) => rest)
  } catch {
    localStorage.setItem(LS_ROOT_FOLDERS_KEY, JSON.stringify(mockRootFolders))

    return mockRootFolders
  }
}

const update = async (id: Id, folders: SubFolder[]): Promise<SubFolder[]> => {
  await PromiseUtils.sleep(1000)
  localStorage.setItem(LS_SUB_FOLDERS_KEY + id, JSON.stringify(folders))

  return folders
}

const FolderApis = { getSubList, getRootList, update }

export default FolderApis
