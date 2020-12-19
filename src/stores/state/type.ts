export interface Task {
  id: string
  createTime: string
  title?: string
  content?: string
  history?: Task[]
}

export type Tasks = Task[]

export interface KeyType {
  keyCode: number
  happenTime: string
}

export interface TaskKeyRecord {
  [key: string]: KeyType[]
}
