import React from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { FolderApis } from './apis'
import { Form, Loading } from './components'
import { FolderTree, FolderSelect } from './components'
import { SubFolder } from './types'

type FolderTreeForm = {
  subFolders: SubFolder[]
}

function App() {
  const [selectedFolderId, setSelectedFolderId] = React.useState('')

  const methods = useForm<FolderTreeForm>()
  const { reset } = methods

  const { data: rootFolders = [], isValidating: isValidatingRootFolders } = useSWR('/rootFolders', () =>
    FolderApis.getRootList()
  )

  const { isValidating: isValidatingSubFolders } = useSWR(
    selectedFolderId && [`/subFolders/${selectedFolderId}`],
    () => FolderApis.getSubList(selectedFolderId),
    { onSuccess: subFolders => reset({ subFolders }) }
  )

  const handleSubmit = async ({ subFolders }: FolderTreeForm) => {
    await FolderApis.update(selectedFolderId, subFolders)

    reset({ subFolders })
  }

  return (
    <>
      <Loading show={isValidatingRootFolders || isValidatingSubFolders} />
      <div className='bg-gray-50 min-h-screen'>
        <div className='w-10/12 max-w-4xl mx-auto pt-20'>
          <div>
            <Form methods={methods} onSubmit={handleSubmit}>
              <div className='grid grid-cols-7 gap-5 w-full'>
                <FolderSelect
                  options={rootFolders}
                  selectedFolderId={selectedFolderId}
                  onSelect={setSelectedFolderId}
                />
                <FolderTree parentId={selectedFolderId} />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
