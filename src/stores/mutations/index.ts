import { MutationTree } from 'vuex'
import { MutationTypes } from './type'
import { State } from '../state/index'
import { KeyTypeItem, Task, Tasks } from '../state/type'

export type Mutations<S = State> = {
  [MutationTypes.PUSH_TASK](state: S, item: Task): void
  [MutationTypes.ASSIGN_TASKS](state: S, item: Tasks): void
  [MutationTypes.ADD_RECORD](
    state: S,
    payload: { keyTypeItem: KeyTypeItem; id: string }
  ): void
  [MutationTypes.CLEAR_RECORD](state: S, id: string): void
}

export const mutations: MutationTree<State> & Mutations = {
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
}
