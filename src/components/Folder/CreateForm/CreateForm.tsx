import { FolderOutlined } from '@ant-design/icons'
import { Form, Loading, Select } from '../../common'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SubFolder } from '../../../types'
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { useUsers } from '../../../hooks'

type Props = {
  onDeleteClick: () => void
  onSave: () => void
  id: string
}

const CreateForm = ({ onDeleteClick, onSave, id }: Props) => {
  const { data: users, isValidating } = useUsers()

  const defaultValues: SubFolder = {
    key: id,
    title: '',
    visibleTo: 'Visible to Everyone'
  }

  const visibleToOptions: SubFolder['visibleTo'][] = [
    'Visible to Everyone',
    'Visible to only Me',
    'Visible to specific users'
  ]

  const outerFormMethods = useFormContext()

  const methods = useForm({ defaultValues })
  const { handleSubmit, getValues, control } = methods

  const visibleTo = useWatch<any>({ name: `visibleTo`, control }) as SubFolder['visibleTo']
  const isVisibleToSpecificUsers = visibleTo === 'Visible to specific users'

  const onSubmitSuccess = () => {
    const newFolder: SubFolder = getValues()
    const folderTree = outerFormMethods.getValues('subFolders')

    outerFormMethods.setValue('subFolders', [newFolder, ...folderTree], { shouldDirty: true })

    onSave()
  }

  return (
    <FormProvider {...methods}>
      <Loading show={!!users.length && isValidating} />
      <div className='flex mb-2'>
        <FolderOutlined className='text-2xl mr-2' />
        <div className='w-72'>
          <Form.Input
            name='title'
            className='mb-2'
            placeholder='Enter new folder name'
            rules={{ required: 'Required field!' }}
          />
          <Form.Select name='visibleTo' className='mb-2' inputClassName='w-full'>
            {visibleToOptions.map(key => (
              <Select.Option key={key} value={key}>
                {key}
              </Select.Option>
            ))}
          </Form.Select>
          {!!isVisibleToSpecificUsers && (
            <Form.Select
              name='authorizedUsers'
              mode='multiple'
              inputClassName='w-full'
              placeholder='Enter users'
              rules={{ required: 'Required field!' }}>
              {users.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Form.Select>
          )}
          <div className='flex justify-end'>
            <Button type='link' danger onClick={onDeleteClick}>
              <DeleteOutlined className='text-xl' />
            </Button>
            <Button type='link' onClick={handleSubmit(onSubmitSuccess)}>
              <SaveOutlined className='text-xl' />
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default CreateForm
