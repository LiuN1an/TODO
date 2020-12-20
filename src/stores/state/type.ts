export interface Task {
  id: string
  createTime: string
  title?: string
  content?: string
  history?: Task[]
}

export type Tasks = Task[]

export interface KeyTypeItem {
  keyCode: number
  happenTime: number
}

export interface TaskKeyRecord {
  [key: string]: KeyTypeItem[]
}

export enum ItemStatus {
  /**
   * 选中未聚焦
   */
  SELECTED,
  /**
   * 选中且聚焦
   */
  FOCUSED,
  /**
   * 输入是否处于composing状态
   */
  COMPOSING,
}
