const DELAY_TIME = 150
/**
 * 检查前后时间是否在一个范围内
 */
export const checkDelay = (oldTime: number, newTime: number): boolean => {
  console.log(oldTime, ' - ', newTime)
  return newTime - oldTime <= DELAY_TIME
}
