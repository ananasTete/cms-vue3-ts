/**
 * 防抖函数
 */

function debounce(fn: any, wait: number): any {
  let timer: any = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn()
    }, wait)
  }
}

export default debounce
