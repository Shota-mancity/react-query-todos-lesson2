import React, { memo } from 'react'
import { PencilAltIcon } from '@heroicons/react/solid'

interface Props{
  onClick: ()=>void;
}

const EditIcon = memo((props: Props) => {
  const {onClick}=props
  
  return (
    <PencilAltIcon
      className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
      onClick={onClick}
    />
  )
})

export default EditIcon
