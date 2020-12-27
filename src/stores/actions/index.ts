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
  [ActionTypes.UNSHIFT_TASK](
    context: ActionCustomContext,
    index: number
  ): Promise<void>
  [ActionTypes.PUSH_TASK](context: ActionCustomContext): Promise<void>
  [ActionTypes.ASSIGN_TASKS](
    context: ActionCustomContext,
    payLoad: Tasks
  ): void
  [ActionTypes.TRIGGER_KEYDOWN](
    context: ActionCustomContext,
    payLoad: {
      item: Task // 触发的taskItem
      index: number // 触发的taskItem下标
      code: number // 触发的按键
      timeStamp: number // 触发时间戳
    }
  ): void
  [ActionTypes.TRIGGER_KEYUP](
    context: ActionCustomContext,
    payLoad: {
      item: Task
      code: number
      timeStamp: number
    }
  ): void
  [ActionTypes.CLEAR_RECORD](
    context: ActionCustomContext,
    id: string
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  // 向前添加任务
  async [ActionTypes.UNSHIFT_TASK]({ commit }, index) {
    const payLoad: Task = {} as Task
    payLoad.id = uniqueId(ID_SEED)
    commit(MutationTypes.UNSHIFT_TASK, { item: payLoad, index })
  },

  // 向后添加任务
  async [ActionTypes.PUSH_TASK]({ commit }) {
    const payLoad: Task = {} as Task
    payLoad.id = uniqueId(ID_SEED)
    commit(MutationTypes.PUSH_TASK, payLoad)
  },

  //
  [ActionTypes.ASSIGN_TASKS]({ commit }, payLoad) {
    commit(MutationTypes.ASSIGN_TASKS, payLoad)
  },

  // 按键按下时判断已按下的键位来触发组合键对应的功能
  [ActionTypes.TRIGGER_KEYDOWN]({ state, commit, dispatch }, payLoad) {
    const findTaskRecord = state.keyRecord[payLoad.item.id]
    // 查看记录中是否有当前触发键盘事件的task的记录，
    if (findTaskRecord && findTaskRecord.length) {
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
          dispatch(ActionTypes.UNSHIFT_TASK, payLoad.index)
          break
        case CompareResult.AFTER_INSERT:
          console.log('after insert')
          dispatch(ActionTypes.PUSH_TASK)
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

  // 当键位松开时，把对应键的缓存清除
  [ActionTypes.TRIGGER_KEYUP]({ state, commit }, payLoad) {
    const findTaskRecord = state.keyRecord[payLoad.item.id]
    if (findTaskRecord && findTaskRecord.length) {
      const findIndex = findTaskRecord.findIndex(
        (item) => item.keyCode === payLoad.code
      )
      if (findIndex !== -1) {
        commit(MutationTypes.REMOVE_RECORD, {
          id: payLoad.item.id,
          index: findIndex,
        })
      }
    }
  },

  // 清除某个任务对应的所有按键记录
  [ActionTypes.CLEAR_RECORD]({ commit }, id) {
    commit(MutationTypes.CLEAR_RECORD, id)
  },
}
