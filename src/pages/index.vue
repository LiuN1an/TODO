<template>
  <div class="container">
    <div class="tasks-container" ref="taskRef">
      <TaskItem v-for="item in tasks" :key="item.id" :tasks="tasks" />
    </div>
  </div>
</template>

<script>
import { onUpdated } from 'vue'
import TaskItem from '../components/TaskItem.vue'
import { useTask } from '../hooks/task'

export default {
  name: 'home',
  components: {
    TaskItem,
  },
  setup(props) {
    const { tasks, taskRef } = useTask()
    onUpdated(() => {
      console.log('updated')
    })
    return {
      tasks,
      taskRef,
    }
  },
}
</script>

<style>
.container {
}
</style>
