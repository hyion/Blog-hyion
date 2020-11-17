/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name) return
  const v_storeValue = window.localStorage.getItem(name)
  if (v_storeValue && v_storeValue !== 'undefined') return v_storeValue
  else return
}

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name) return
  window.localStorage.removeItem(name)
}
