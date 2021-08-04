/**
 * 封装一个缓存数据和操作缓存数据的类
 */

class localCache {
  //设置缓存
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value)) //将value值转为字符串
  }

  //获取缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  //删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  //清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new localCache()
