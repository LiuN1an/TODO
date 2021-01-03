import { getLocalItem } from '../utils/storage'
import { useStore } from 'vuex'
import { ActionTypes } from './actions/type'

export const TODO_TASKS = 'todo-tasks'
const getTasks = (): string => {
  // const tasks: Tasks = []
  // for (let i = 0; i < 100; i++) {
  //   tasks.push({
  //     id: 'asdasd',
  //     createTime: new Date().toTimeString(),
  //     title: 'asdhjkkasd',
  //     content: 'qwenbczxc',
  //   })
  // }
  // return tasks
  const cache = getLocalItem(TODO_TASKS)
  return cache
}
export const importTasksCache = (): boolean => {
  const store = useStore()
  const tasks = getTasks()
  console.log(tasks)

  if (tasks) {
    store.dispatch(ActionTypes.ASSIGN_TASKS, tasks)
    return false
  } else {
    return true
  }
}
