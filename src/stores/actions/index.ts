import { ActionContext, ActionTree } from 'vuex'
import { ActionTypes } from './type'
import { State } from '../state/index'
import { KeyType, Task, Tasks } from '../state/type'
import { uniqueId } from 'lodash'
import { MutationTypes } from '../mutations/type'

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
    payLoad: KeyType & {
      id: string
    }
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
  [ActionTypes.TRIGGER_KEYPRESS]({ state, commit }, payLoad) {
    const findTaskRecord = state.keyRecord[payLoad.id]
    // 查看记录中是否有当前触发键盘事件的task的记录，
    if (findTaskRecord) {
      // 在同一个task上已经进行触发过一次keypress
      switch (
        compareRecord(findTaskRecord, {
          keyCode: payLoad.keyCode,
          happenTime: payLoad.happenTime,
        })
      ) {
        case CompareResult.CONFIRM:
          break
        case CompareResult.FINISHED:
          break
        case CompareResult.BEFORE_INSERT:
          break
        case CompareResult.AFTER_INSERT:
          break
        case CompareResult.MOVE_ON:
          break
        case CompareResult.MOVE_DOWN:
          break
        default:
          break
      }
    } else {
      commit(MutationTypes.ADD_RECORD)
    }
  },
}

const enum CompareResult {
  /**
   * 确定
   */
  CONFIRM,
  /**
   * 已完成
   */
  FINISHED,
  /**
   * 向上插入
   */
  BEFORE_INSERT,
  /**
   * 向下插入
   */
  AFTER_INSERT,
  /**
   * 向上移动
   */
  MOVE_ON,
  /**
   * 向下移动
   */
  MOVE_DOWN,
}

// TODO: 处理键盘事件
const compareRecord = (
  record: KeyType[],
  payLoad: KeyType
): CompareResult => {
  return CompareResult.AFTER_INSERT
}
