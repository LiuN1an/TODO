import { useStore } from 'vuex'
import { ActionTypes } from './actions/type'
import { Tasks } from './state/type'

const getTasks = () => {
  const tasks: Tasks = []
  for (let i = 0; i < 100; i++) {
    tasks.push({
      id: 'asdasd',
      createTime: new Date().toTimeString(),
      title: 'asdhjkkasd',
      content: 'qwenbczxc',
    })
  }
  return tasks
}
export const importTasksCache = (): void => {
  const store = useStore()
  const tasks = getTasks()
  tasks && store.dispatch(ActionTypes.ASSIGN_TASKS, tasks)
}
