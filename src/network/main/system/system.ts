/**
 * 封装用于网络请求的方法
 */

import myRequest from '@/network'

//请求数据的方法
export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post({
    url,
    data: queryInfo
  })
}

//删除数据的方法，传入参数如 /users/id
export function deletePageDataById(url: string) {
  return myRequest.delete({
    url
  })
}

//新建数据的方法
export function createPageData(url: string, newData: any) {
  return myRequest.post({
    url,
    data: newData
  })
}

//更新数据的方法
export function updatePageData(url: string, updateData: any) {
  return myRequest.patch({
    url,
    data: updateData
  })
}
