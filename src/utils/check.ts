import { KeyTypeItem } from 'src/stores/state/type'

const enum KeyCodeInfo {
  ENTER = 13,
  CTRL = 17,
  SHIFT = 16,
  ALT = 18,
  S = 83,
}

export const checkFinished = (
  record: KeyTypeItem[],
  current: KeyTypeItem
): boolean => {
  const lastRecord = record[record.length - 1]
  if (
    lastRecord.keyCode === KeyCodeInfo.ALT &&
    current.keyCode === KeyCodeInfo.ENTER
  ) {
    return true
  } else {
    return false
  }
}

export const checkBeforeInsert = (
  record: KeyTypeItem[],
  current: KeyTypeItem
): boolean => {
  const lastRecord = record[record.length - 1]
  if (
    lastRecord.keyCode === KeyCodeInfo.SHIFT &&
    current.keyCode === KeyCodeInfo.ENTER
  ) {
    return true
  } else {
    return false
  }
}

export const checkAfterInsert = (
  record: KeyTypeItem[],
  current: KeyTypeItem
): boolean => {
  const lastRecord = record[record.length - 1]
  if (
    lastRecord.keyCode === KeyCodeInfo.CTRL &&
    current.keyCode === KeyCodeInfo.ENTER
  ) {
    return true
  } else {
    return false
  }
}

export const checkSave = (
  record: KeyTypeItem[],
  current: KeyTypeItem
): boolean => {
  const lastRecord = record[record.length - 1]
  if (
    lastRecord.keyCode === KeyCodeInfo.CTRL &&
    current.keyCode === KeyCodeInfo.S
  ) {
    return true
  } else {
    return false
  }
}
