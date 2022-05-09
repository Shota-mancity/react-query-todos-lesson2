import React, { VFC, useState, ChangeEvent } from 'react'
import {TaskListMemo} from '../organisms/TaskList'
import {EditTaskMemo} from '../organisms/EditTask'
import PrimaryInput from '../atoms/PrimaryInput'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

const MainTask: VFC = () => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  console.log('rendered MainTask')

  const onChangeDummyText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onClickIcon = () => {
    navigate('/tags')
  }

  return (
    <>
      <PrimaryInput
        title="dummy test?"
        text={text}
        onChange={onChangeDummyText}
      />
      <p className=" mb-10 text-xl font-bold">Tasks</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskListMemo />
        <EditTaskMemo />
      </div>
      <ChevronDoubleRightIcon
        className="w-5 h-5 cursor-pointer mt-2 text-blue-500"
        onClick={onClickIcon}
      />
      <p>Tag page</p>
    </>
  )
}

export default MainTask
