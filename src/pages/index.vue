<template>
  <div class="container">
    <div v-if="tasks.length" class="tasks-container" ref="taskRef">
      <TaskItem v-for="item in tasks" :key="item.id" :tasks="tasks" />
    </div>
    <div v-else>
      <button ref="buttonRef">++++</button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue'
import TaskItem from '../components/TaskItem.vue'
import { useTask } from '../hooks/task'

export default {
  name: 'home',
  components: {
    TaskItem,
  },
  setup(props) {
    const { tasks, taskRef, createNewTask } = useTask()
    const buttonRef = ref(null)
    const listenBodyEnter = (event) => {
      const code = event.which || event.keyCode || event.charCode
      if (code === 13) {
        createNewTask()
        document.removeEventListener('keypress', listenBodyEnter)
      }
    }
    onMounted(() => {
      if (buttonRef) {
        document.addEventListener('keypress', listenBodyEnter)
      }
    })

    return {
      tasks,
      taskRef,
      buttonRef,
    }
  },
}
</script>

<style>
.container {
}
</style>
