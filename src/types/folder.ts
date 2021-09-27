type Folder = {
  key: string
  title: string
}

type VisibleTo = 'Visible to Everyone' | 'Visible to only Me' | 'Visible to specific users'

export type SubFolder = Folder & {
  children?: SubFolder[]
  visibleTo: VisibleTo
}

export type RootFolder = Folder
