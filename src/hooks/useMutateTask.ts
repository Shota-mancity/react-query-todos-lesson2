import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { EditTask, Task } from '../types/types'
import axios from 'axios'
import { resetEditedTask } from '../slices/todoSlice'

// taskの新規作成・更新・削除
export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  // state(task)の更新等に応じて、自分で既存のキャッシュを書き換えるためにクライアントを生成

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      // 新規作成用taskのオブジェクト(taskのタイトルや番号)を引数で受け取り
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks/`, task),
    // axiosの第二引数にtaskを渡すことで、エンドポイントにtaskのオブジェクトが渡される
    {
      // onSuccessでpostメソッド成功時の後処理を書くことができる
      onSuccess: res => {
        // onSuccessのresにはpostメソッドで新しく作成したtaskが入ってくる
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        // getQueryData: 既存のキャッシュを取得(取得したいキャッシュのデータはkeyで特定)
        if (previousTodos) {
          queryClient.setQueryData<Task[]>('tasks', [
            // setQueryData: キャッシュの書き換え
            ...previousTodos,
            res.data
          ])
          // 既存に配列に新しく生成したtaskを追加
        }
        dispatch(resetEditedTask())
      }
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      // 更新用taskのオブジェクトを引数で受け取り
      axios.put<Task>(
        `${process.env.REACT_APP_REST_URL}/tasks/${task.id}/`,
        task
      ),
    // putメソッドで更新のアクセス
    {
      onSuccess: (res, variables) => {
        // res:putメソッドの結果(更新後のtaskのオブジェクト<Task>)が入る
        // vatiables:エンドポイントアクセス時に渡したデータ(taskのオブジェクト<EditTask>)が入る
        // taskをonSuccess内で使用できないため、variablesで呼び出し直している
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        // keyがtasksのキャッシュデータを取り出し
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map(task =>
              // keyがtasksのキャッシュデータを編集
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
        // editedTaskのstateを初期化
      }
    }
  )

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}/`),
      // tasksのエンドポイント(データベース)の対象データを削除
    {
      // deleteメソッド成功時はキャッシュの内容を更新
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter(task => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      }
    }
  )

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
