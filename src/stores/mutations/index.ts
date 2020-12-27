import { MutationTree } from 'vuex'
import { MutationTypes } from './type'
import { State } from '../state/index'
import { KeyTypeItem, Task, Tasks } from '../state/type'

export type Mutations<S = State> = {
  [MutationTypes.UNSHIFT_TASK](
    state: S,
    payload: { item: Task; index: number }
  ): void
  [MutationTypes.PUSH_TASK](state: S, item: Task): void
  [MutationTypes.ASSIGN_TASKS](state: S, item: Tasks): void
  [MutationTypes.ADD_RECORD](
    state: S,
    payload: { keyTypeItem: KeyTypeItem; id: string }
  ): void
  [MutationTypes.CLEAR_RECORD](state: S, id: string): void
  [MutationTypes.REMOVE_RECORD](
    state: S,
    payload: { id: string; index: number }
  ): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.UNSHIFT_TASK](state, payload) {
    state.tasks.splice(payload.index, 0, payload.item)
  },
  [MutationTypes.PUSH_TASK](state, item) {
    state.tasks.push(item)
  },
  [MutationTypes.ASSIGN_TASKS](state, items) {
    Object.assign(state.tasks, items)
  },
  [MutationTypes.ADD_RECORD](state, payload) {
    state.keyRecord[payload.id] = [payload.keyTypeItem]
  },
  [MutationTypes.CLEAR_RECORD](state, id) {
    state.keyRecord[id] = [] as KeyTypeItem[]
  },
  [MutationTypes.REMOVE_RECORD](state, payload) {
    state.keyRecord[payload.id].splice(payload.index, 1)
  },
}
