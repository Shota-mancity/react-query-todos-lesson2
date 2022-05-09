// redux-tool-kitでstateを定義
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { EditTask, Tag } from '../types/types'

// stateの定義
export interface TaskState {
  editedTask: EditTask
  editedTag: Tag
}
// reduxでグローバル化して管理するstateは新規作成・編集用のtaskとtag

// stateの初期値
const initialState: TaskState = {
  editedTask: {
    id: 0,
    title: '',
    tag: 0
  },
  editedTag: {
    id: 0,
    name: ''
  }
}

export const taskSlice = createSlice({
  name: 'task',
//   sliceの名前
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //   taskのstateを更新するアクション
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      //   引数はpayloadとして、変更したいタスクのオブジェクトを受け取る
      // 受け取ったオブジェクトはpayloadでアクセス可能
      state.editedTask = action.payload
      //   payloadの中身をそのままstateのeditedTaskに格納
    },
    //   reactのコンポーネントから、dispatchを使ってアクションを呼び出し
    // 変更したい新しいタスクのオブジェクトを引数で渡す
    // payloadを使って、そのオブジェクトをredux内のeditedTaskに格納

    resetEditedTask: state => {
      state.editedTask = initialState.editedTask
    },

    //   tagのstateを更新するアクション
    setEditedTag: (state, action: PayloadAction<Tag>) => {
      state.editedTag = action.payload
    },

    resetEditedTag: state => {
      state.editedTag = initialState.editedTag
    }
  }
})

// 4つのアクションをreactコンポーネントから呼び出せるようexport
export const {
  setEditedTask,
  resetEditedTask,
  setEditedTag,
  resetEditedTag
} = taskSlice.actions

// redux内のeditedTaskとeditedTagというstateを返してくれる関数
export const selectTask = (state: RootState) => state.task.editedTask
export const selectTag = (state: RootState) => state.task.editedTag

export default taskSlice.reducer
