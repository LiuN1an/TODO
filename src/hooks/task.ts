import { ActionTypes } from '../stores/actions/type'
import { importTasksCache } from '../stores/cache'
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

/**
 * 处理任务列表的初始化和事件绑定
 */
export const useTask = () => {
  const { state, dispatch } = useStore()
  const { tasks } = state
  const taskRef = ref<HTMLDivElement | null>(null)
  const isRegister = ref<boolean>(false) // task是否被注册的状态

  onBeforeMount(() => {
    // importTasksCache()
  })

  /**
   * 因为taskRef的引用到的dom节点可能会被干掉，所以在每次重新渲染时再通过isRegister来把控
   */
  onUpdated(() => {
    const refValue = taskRef.value
    if (refValue && !isRegister.value) {
      refValue.addEventListener('keydown', (event) => {
        // 与TaskItem的template书写理念耦合，所以选数组第二个作为item的顶层元素
        const triggerPlace: HTMLDivElement = <HTMLDivElement>(
          event.composedPath()[1]
        )
        const code = event.which || event.keyCode || event.charCode
        // 获取到触发元素在代理元素taskRef的子元素中的位置
        const index: number = [].findIndex.apply(refValue.children, [
          (item) => item === triggerPlace,
        ])

        dispatch(ActionTypes.TRIGGER_KEYDOWN, {
          item: tasks[index],
          index: index,
          code,
          timeStamp: event.timeStamp,
          exec: (): void => event.preventDefault(),
        })
      })
      refValue.addEventListener('keyup', (event) => {
        // 与TaskItem的template书写理念耦合，所以选数组第二个作为item的顶层元素
        const triggerPlace: HTMLDivElement = <HTMLDivElement>(
          event.composedPath()[1]
        )
        const code = event.which || event.keyCode || event.charCode
        // 获取到触发元素在代理元素taskRef的子元素中的位置
        const index: number = [].findIndex.apply(refValue.children, [
          (item) => item === triggerPlace,
        ])

        dispatch(ActionTypes.TRIGGER_KEYUP, {
          item: tasks[index],
          code,
          timeStamp: event.timeStamp,
        })
      })
      isRegister.value = true
    }
  })

  const createNewTask = (): void => {
    dispatch(ActionTypes.PUSH_TASK)
  }

  return {
    tasks,
    taskRef,
    createNewTask,
  }
}
