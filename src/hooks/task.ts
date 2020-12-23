import { ActionTypes } from '../stores/actions/type'
import { importTasksCache } from '../stores/cache'
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

/**
 * 处理任务列表的初始化和事件绑定
 */
export const useTask = () => {
  const { state, dispatch } = useStore()
  const { tasks } = state
  const taskRef = ref<HTMLDivElement | null>(null)

  onBeforeMount(() => {
    importTasksCache()
  })

  onMounted(() => {
    const refValue = taskRef.value
    if (refValue) {
      // TODO: keypress和keydown的关系涉及到组合键位时的按键操作
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
        //
        dispatch(ActionTypes.TRIGGER_KEYPRESS, {
          item: tasks[index],
          code,
          timeStamp: event.timeStamp,
        })
      })
    }
  })

  return {
    tasks,
    taskRef,
  }
}
