import React, { VFC, memo } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useMutateTag } from '../../hooks/useMutateTag'
import EditIcon from '../atoms/icons/EditIcon'
import DeleteIcon from '../atoms/icons/DeleteIcon'
import { setEditedTag } from '../../slices/todoSlice'
import { Tag } from '../../types/types'

interface Props {
  tag: Tag
}

const TagItem: VFC<Props> = memo(({ tag }) => {
  const dispatch = useAppDispatch()
  const { deleteTagMutation } = useMutateTag()

  console.log('rendered TagItem')

  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <EditIcon onClick={() => dispatch(setEditedTag(tag))} />
        <DeleteIcon onClick={() => deleteTagMutation.mutate(tag.id)} />
      </div>
    </li>
  )
})

export default TagItem
