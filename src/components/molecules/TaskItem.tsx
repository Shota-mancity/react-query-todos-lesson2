import React, {VFC, memo} from 'react'
import EditIcon from '../atoms/icons/EditIcon'
import DeleteIcon from '../atoms/icons/DeleteIcon'
import { useAppDispatch } from '../../app/hooks';
import { setEditedTask } from '../../slices/todoSlice';
import { Task } from '../../types/types';
import { useMutateTask } from '../../hooks/useMutateTask';

interface Props {
  task: Task
}

const TaskItem: VFC<Props> = (props) => {
  const { task } = props
  const dispatch=useAppDispatch()
  const {deleteTaskMutation}=useMutateTask()

  console.log("rendered TaskItem")
  if(deleteTaskMutation.isLoading){
    return <p>Deleting...</p>
  }

  const onClickEditTask = () => {
    dispatch(setEditedTask({
      id: task.id,
      title: task.title,
      tag: task.tag
    }))
    // dispatchからsetEditedTaskを呼び出すことで、reduxのeditedTaskに反映される
  }
  const onClickDeleteTask = () => {
    deleteTaskMutation.mutate(task.id)
    // mutationを実際に実行する時は.mutateを使う
  }

  return (
    <li className="my-3" >
      <span className="font-bold" >{task.title}</span>
      <span>{" : "}{task.tag_name}</span>
      <div className="flex float-right ml-20 ">
      {/* float-rightがあることで要素の配置が右端基準になる */}
        <EditIcon onClick={onClickEditTask} />
        <DeleteIcon onClick={onClickDeleteTask} />
      </div>
    </li>
  )
}

export const TaskItemMemo=memo(TaskItem)
