export const getLocalItem = (key: string): any => {
  const result = window.localStorage.getItem(key)
  return result ? JSON.parse(result) : undefined
}

export const setLocalItem = (
  key: string,
  value: any
): string | undefined => {
  if (value) {
    const val = JSON.stringify(value)
    window.localStorage.setItem(key, val)
    return key
  }
}
