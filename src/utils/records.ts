import { KeyTypeItem } from '../stores/state/type'
import {
  checkAfterInsert,
  checkBeforeInsert,
  checkFinished,
  checkSave,
} from './check'

export const enum CompareResult {
  /**
   * 开始focus
   */
  FOCUS,
  /**
   * 取消focus
   */
  CANCAL_FOCUS,
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
  /**
   * 保存
   */
  SAVE,
  /**
   * 无
   */
  NONE,
}

/**
 * 进入连键的判断，这里来判断一些功能键位的情况
 */
export const compareRecord = (
  record: KeyTypeItem[],
  payLoad: KeyTypeItem
): CompareResult => {
  console.assert(record.length !== 0)

  // 注意添加顺序，可以随时扩展check-plugin-function
  if (checkFinished(record, payLoad)) {
    return CompareResult.FINISHED
  }

  if (checkBeforeInsert(record, payLoad)) {
    return CompareResult.BEFORE_INSERT
  }

  if (checkAfterInsert(record, payLoad)) {
    return CompareResult.AFTER_INSERT
  }

  if (checkSave(record, payLoad)) {
    return CompareResult.SAVE
  }

  // 优先判断延时情况，默许对于所有组合键必须在一定时间范围内才有效
  // if (checkDelay(lastRecord.happenTime, payLoad.happenTime)) {
  //   // 双击enter： 使任务已完成
  //   if (
  //     lastRecord.keyCode === KeyCodeInfo.ENTER &&
  //     payLoad.keyCode === KeyCodeInfo.ENTER
  //   ) {
  //     return CompareResult.FINISHED
  //   }
  //   // shift + enter: 向上方插入一条
  //   if (
  //     lastRecord.keyCode === KeyCodeInfo.Shift &&
  //     payLoad.keyCode === KeyCodeInfo.ENTER
  //   ) {
  //     return CompareResult.BEFORE_INSERT
  //   }
  //   // ctrl + enter: 向下方插入一条
  //   if (
  //     lastRecord.keyCode === KeyCodeInfo.CTRL &&
  //     payLoad.keyCode === KeyCodeInfo.ENTER
  //   ) {
  //     return CompareResult.AFTER_INSERT
  //   }
  // } else {
  //   console.error(
  //     `delay is true: - ${lastRecord.happenTime} + ${
  //       payLoad.happenTime
  //     } = ${-lastRecord.happenTime + payLoad.happenTime} => ${
  //       -lastRecord.happenTime + payLoad.happenTime <= DELAY_TIME
  //     }`
  //   )
  // }
  return CompareResult.NONE
}
