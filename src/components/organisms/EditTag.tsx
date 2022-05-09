import React, { VFC, memo, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectTag, setEditedTag } from '../../slices/todoSlice'
import PrimaryInput from '../atoms/PrimaryInput'
import { useMutateTag } from '../../hooks/useMutateTag'

const EditTag: VFC = memo(() => {
  const editedTag = useAppSelector(selectTag)
  const dispatch = useAppDispatch()
  const { createTagMutation, updateTagMutation } = useMutateTag()
  //   データベースとキャッシュの更新

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTag.id === 0) {
      createTagMutation.mutate(editedTag)
    } else {
      updateTagMutation.mutate(editedTag)
    }
  }

  console.log('rendered EditedTag')
  if (createTagMutation.isLoading) return <span>Creating...</span>
  if (updateTagMutation.isLoading) return <span>Updating...</span>

  return (
    <>
      <form method="post" onSubmit={submitHandler}>
        <PrimaryInput
          title="new Tag ?"
          text={editedTag.name}
          onChange={e =>
            dispatch(setEditedTag({ ...editedTag, name: e.target.value }))
          }
        />
        <button 
        className="disabled:opacity-40 py-2 px-3 ml-3 rounded text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700"
        disabled={!editedTag.name}
        >
          {editedTag.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
    </>
  )
})

export default EditTag
