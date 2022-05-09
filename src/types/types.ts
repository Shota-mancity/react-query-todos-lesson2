export interface Task {
  id: number
  title: string
  tag: number
  tag_name: string
  created_at: string
  updated_at: string
}

// POSTメソッド用のデータ型（Taskの新規作成・編集）
export interface EditTask {
  id: number
  title: string
  tag: number
}

export interface Tag {
  id: number
  name: string
}
