import { ActionTypes } from '../stores/actions/type'
import { importTasksCache } from '../stores/cache'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

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
      refValue.addEventListener('keypress', (event) => {
        const triggerPlace: HTMLDivElement = <HTMLDivElement>(
          event.composedPath()[1]
        )
        const index: number = [].findIndex.apply(refValue.children, [
          (item) => item === triggerPlace,
        ])
        dispatch(ActionTypes.TRIGGER_KEYPRESS, tasks[index])
      })
    }
  })

  return {
    tasks,
    taskRef,
  }
}
