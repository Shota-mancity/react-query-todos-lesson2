import React, {VFC, FormEvent, memo} from 'react'
import PrimaryInput from '../atoms/PrimaryInput';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useQueryTags } from '../../hooks/useQueryTags';
import { setEditedTask, selectTask } from '../../slices/todoSlice';
import { useMutateTask } from '../../hooks/useMutateTask';

const EditTask:VFC = () => {
  const editedTask=useAppSelector(selectTask)
  const {createTaskMutation, updateTaskMutation}=useMutateTask()
  const dispatch=useAppDispatch()
  const {status, data}=useQueryTags()

  console.log("rendered EditTask")
  if(status==="loading") return <div>{"Loading..."}</div>
  if(status==="error") return <div>{"Error"}</div>
  if(createTaskMutation.isLoading){
    return <span>Creating...</span>
  }
  if(updateTaskMutation.isLoading){
    return <span>Updating...</span>
  }

  // onSubmitしない限り、stateが更新されるだけで、データベースの中身とキャッシュの中身は変わらない
  // データベースとキャッシュの内容の書き換えはuseMutationで実行
  const submitHandler=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(editedTask.id===0){
      createTaskMutation.mutate(editedTask)
    } else{
      updateTaskMutation.mutate(editedTask)
    }
  }

  return (
    <div className="mt-2" >
      <form method="post" onSubmit={submitHandler} >
      <PrimaryInput 
      title={"new task ?"} 
      text={editedTask.title}
      // 編集中及び編集タスクがある場合は、valueにeditedTask.titleの値が入る
      onChange={(e)=>dispatch(setEditedTask({...editedTask, title: e.target.value}))} 
      />
      <button 
      className="disabled:opacity-40 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer ml-4 py-2 px-3 rounded" 
      disabled={!editedTask.title || !editedTask.tag}
      >
      {editedTask.id===0 ? "Create" : "Update"}
      </button>
      </form>
      <div className="mt-2">
      <select 
      className="border border-gray-300 py-2 pl-2" 
      // value={editedTask.tag} 
      onChange={(e)=>dispatch(setEditedTask({...editedTask, tag: Number(e.target.value)}))}
      // e.target.valueはstringのためnumber型に変換
>
        <option value={0} >Tag</option>
        {
          data?.map(tag=>(
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          )) 
        }
      </select>
      </div>
    </div>
  )
}

export const EditTaskMemo=memo(EditTask)
