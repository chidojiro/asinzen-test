import { Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import { Select as BaseSelect, Card } from '../../../components'
import { Id, RootFolder } from '../../../types'

type Props = {
  selectedFolderId: Id
  onSelect: (id: Id) => void
  options: RootFolder[]
}

const Select = ({ selectedFolderId, onSelect, options }: Props) => {
  const {
    reset,
    formState: { isSubmitting, isDirty }
  } = useFormContext()

  return (
    <Card title='Copy Data to Folder' className='col-span-3'>
      <BaseSelect value={selectedFolderId} defaultValue='' onChange={onSelect} className='w-full'>
        <BaseSelect.Option value=''>Select folder</BaseSelect.Option>
        {options.map(({ key, title }) => (
          <BaseSelect.Option key={key} value={key}>
            {title}
          </BaseSelect.Option>
        ))}
      </BaseSelect>
      <div className='flex justify-end mt-3'>
        <Button type='primary' danger className='mr-3 rounded' disabled={!isDirty} onClick={() => reset()}>
          CANCEL
        </Button>
        <Button htmlType='submit' type='primary' className='rounded' disabled={!isDirty} loading={isSubmitting}>
          SAVE
        </Button>
      </div>
    </Card>
  )
}

export default Select
