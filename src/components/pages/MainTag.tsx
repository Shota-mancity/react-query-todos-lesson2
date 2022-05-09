import React, { VFC } from 'react'
import TagList from '../organisms/TagList'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import EditTag from '../organisms/EditTag';

const MainTag: VFC = () => {
  const navigate = useNavigate()

  console.log("rendered MainTag")

  return (
    <>
      <p className="text-xl font-bold mb-10">Tags</p>
      <div className="grid grid-cols-2 gap-40">
        <TagList />
        <EditTag />
      </div>
      <ChevronDoubleLeftIcon
        className="h-5 w-5 cursor-pointer mt-2 text-blue-500"
        onClick={() => navigate('/')}
      />
      <p>Task page</p>
    </>
  )
}

export default MainTag
