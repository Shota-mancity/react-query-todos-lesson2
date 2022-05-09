import React, { memo } from 'react'
import { TrashIcon } from '@heroicons/react/solid';

interface Props{
    onClick: ()=>void;
  }  

const DeleteIcon = memo((props: Props) => {
    const {onClick}=props
  return (
    <>
      <TrashIcon className="h-5 w-5 mx-1 text-blue-500 cursor-pointer" onClick={onClick} />
    </>
  )
})

export default DeleteIcon
