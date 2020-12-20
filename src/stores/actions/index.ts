import { ActionContext, ActionTree } from 'vuex'
import { ActionTypes } from './type'
import { State } from '../state/index'
import { KeyTypeItem, Task, Tasks } from '../state/type'
import { uniqueId } from 'lodash'
import { MutationTypes } from '../mutations/type'
import { checkDelay, getHappenTime } from '../../utils/time'

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
      item: Task
      code: number
      timeStamp: number
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
    const findTaskRecord = state.keyRecord[payLoad.item.id]
    // 查看记录中是否有当前触发键盘事件的task的记录，
    if (findTaskRecord) {
      // 在同一个task上已经进行触发过一次keypress
      switch (
        compareRecord(findTaskRecord, {
          keyCode: payLoad.code,
          happenTime: payLoad.timeStamp,
        })
      ) {
        case CompareResult.CONFIRM:
          break
        case CompareResult.FINISHED:
          console.log('finished')

          break
        case CompareResult.BEFORE_INSERT:
          console.log('before insert')

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

const enum KeyCodeInfo {
  ENTER = 13,
  CTRL = 17,
  Shift = 16,
}
/**
 * 进入连键的判断，这里来判断一些功能键位的情况
 */
const compareRecord = (
  record: KeyTypeItem[],
  payLoad: KeyTypeItem
): CompareResult => {
  console.assert(record.length !== 0)
  const lastRecord = record[record.length - 1]

  // 优先判断延时情况
  if (checkDelay(lastRecord.happenTime, payLoad.happenTime)) {
    if (
      record[record.length - 1].keyCode === KeyCodeInfo.ENTER &&
      payLoad.keyCode === KeyCodeInfo.ENTER
    ) {
      // 双击enter： 使任务已完成
      return CompareResult.FINISHED
    }
    // shift + enter: 向上方插入一条
    if (
      record[record.length - 1].keyCode === KeyCodeInfo.Shift &&
      payLoad.keyCode === KeyCodeInfo.ENTER
    ) {
      // 双击enter： 使任务已完成
      return CompareResult.BEFORE_INSERT
    }
    // ctrl + enter: 向下方插入一条
  }
  return CompareResult.AFTER_INSERT
}
