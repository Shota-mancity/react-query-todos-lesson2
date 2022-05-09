import axios from 'axios'
import { Task } from '../types/types'
import { useQuery } from 'react-query'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      `${process.env.REACT_APP_REST_URL}/tasks/`
    )
    return data
  }

  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: 0,
    // tasksはリアルタイムにデータを取得
    refetchOnWindowFocus: true
  })
}
