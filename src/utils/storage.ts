export const storage = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = localStorage.getItem(key)
    if (value && value !== undefined && value !== null) {
      return JSON.parse(value)
    }
    return false
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  }
}
export const sessionStorage = {
  set(key: string, value: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value)
    }
    return false
  },
  remove(key: string): void {
    window.sessionStorage.removeItem(key)
  }
}
