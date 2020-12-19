import { MutationTree } from 'vuex'
import { MutationTypes } from './type'
import { State } from '../state/index'
import { Task, Tasks } from '../state/type'

// TODO:添加ADD_RECORD对应的mutation
export type Mutations<S = State> = {
  [MutationTypes.PUSH_TASK](state: S, item: Task): void
  [MutationTypes.ASSIGN_TASKS](state: S, item: Tasks): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.PUSH_TASK](state, item) {
    state.tasks.push(item)
  },
  [MutationTypes.ASSIGN_TASKS](state, items) {
    Object.assign(state.tasks, items)
  },
}
