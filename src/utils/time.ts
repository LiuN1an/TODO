/**
 * 按键之间的时间最大间隔
 */
export const DELAY_TIME = 150

/**
 * 检查前后时间是否在一个范围内
 */
export const checkDelay = (oldTime: number, newTime: number): boolean => {
  // console.log(newTime, ' - ', oldTime, ' = ', newTime - oldTime)
  return newTime - oldTime <= DELAY_TIME
}
