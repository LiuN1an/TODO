import { MutationTree } from 'vuex'
import { MutationTypes } from './type'
import { State } from '../state/index'
import { KeyTypeItem, Task, Tasks } from '../state/type'
import { setLocalItem } from '../../utils/storage'
import { TODO_TASKS } from '../cache'

export type Mutations<S = State> = {
  [MutationTypes.PUSH_TASK](
    state: S,
    payload: { item: Task; index: number }
  ): void
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
  [MutationTypes.SAVE](state: S): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.PUSH_TASK](state, payload) {
    state.tasks.splice(payload.index, 0, payload.item)
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
  [MutationTypes.SAVE](state) {
    console.log('store success')
    setLocalItem(TODO_TASKS, state.tasks)
  },
}
