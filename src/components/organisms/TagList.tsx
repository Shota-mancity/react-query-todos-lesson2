import React, { VFC, memo } from 'react'
import { useQueryTags } from '../../hooks/useQueryTags'
import TagItem from '../molecules/TagItem';

const TagList: VFC = memo(() => {
  const { status, data } = useQueryTags()

  console.log("rendered TagList")
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <ul>
        {
            data?.map(tag=>(
                <TagItem key={tag.id} tag={tag} />
            ))
        }
    </ul>
  )
})

export default TagList
