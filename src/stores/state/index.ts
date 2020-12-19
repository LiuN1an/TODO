import { Tasks, TaskKeyRecord } from './type'

export const state = {
  tasks: [] as Tasks,
  keyRecord: {} as TaskKeyRecord,
}

export type State = typeof state
