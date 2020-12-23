import { ActionContext, ActionTree } from 'vuex'
import { ActionTypes } from './type'
import { State } from '../state/index'
import { KeyTypeItem, Task, Tasks } from '../state/type'
import { uniqueId } from 'lodash'
import { MutationTypes } from '../mutations/type'
import { compareRecord, CompareResult } from '../../utils/records'

const ID_SEED = 'WTFagsh!@4124852_'

type ActionCustomContext = ActionContext<State, State>
export interface Actions {
  [ActionTypes.PUSH_TASK](
    context: ActionCustomContext,
    payLoad: Exclude<Task, 'id'>
  ): Promise<void>
  [ActionTypes.ASSIGN_TASKS](
    context: ActionCustomContext,
    payLoad: Tasks
  ): void
  [ActionTypes.TRIGGER_KEYPRESS](
    context: ActionCustomContext,
    payLoad: {
      item: Task // 触发的taskItem
      code: number // 触发的按键
      timeStamp: number // 触发时间戳
    }
  ): void
  [ActionTypes.CLEAR_RECORD](
    context: ActionCustomContext,
    id: string
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.PUSH_TASK]({ commit }, payLoad) {
    payLoad['id'] = uniqueId(ID_SEED)
    commit(MutationTypes.PUSH_TASK, payLoad)
  },

  [ActionTypes.ASSIGN_TASKS]({ commit }, payLoad) {
    commit(MutationTypes.ASSIGN_TASKS, payLoad)
  },

  [ActionTypes.TRIGGER_KEYPRESS]({ state, commit, dispatch }, payLoad) {
    const findTaskRecord = state.keyRecord[payLoad.item.id]
    // 查看记录中是否有当前触发键盘事件的task的记录，
    if (findTaskRecord && findTaskRecord.length) {
      // 在同一个task上已经进行触发过一次keypress
      switch (
        compareRecord(findTaskRecord, {
          keyCode: payLoad.code,
          happenTime: payLoad.timeStamp,
        })
      ) {
        case CompareResult.FOCUS:
          break
        case CompareResult.CANCAL_FOCUS:
          break
        case CompareResult.FINISHED:
          console.log('finished')
          break
        case CompareResult.BEFORE_INSERT:
          console.log('before insert')

          break
        case CompareResult.AFTER_INSERT:
          console.log('after insert')
          break
        case CompareResult.MOVE_ON:
          break
        case CompareResult.MOVE_DOWN:
          break
        default:
          console.log('none')
          break
      }
      dispatch(ActionTypes.CLEAR_RECORD, payLoad.item.id)
    } else {
      // 向keyRecord[${task.id}]新增一个keyAction array
      const keyTypeItem: KeyTypeItem = {
        keyCode: payLoad.code,
        happenTime: payLoad.timeStamp,
      }
      commit(MutationTypes.ADD_RECORD, {
        keyTypeItem,
        id: payLoad.item.id,
      })
    }
  },
  [ActionTypes.CLEAR_RECORD]({ commit }, id) {
    commit(MutationTypes.CLEAR_RECORD, id)
  },
}
