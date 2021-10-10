/**
 * 封装根据请求到的菜单中的路径获取到对应的route数组的函数
 *
 * 先将所有的route对象都放到一个数组allRoutes中，遍历userMenus中每一个对象的路径与
 * allRoutes对象中每一个route对象的路径进行对比，相同的放到一个新数组中。返回这个数组。
 */

import { RouteRecordRaw } from 'vue-router'
import { breadsumbType } from '@/base-ui/breadcrumb/src/types'

//定义一个变量用来保存第一个对象
let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 先加载main中定义的所有route对象
  const allRoutes: RouteRecordRaw[] = []

  //递归加载指定目录下所有的ts文件,返回一个方法
  const routeFiles = require.context('../router/main', true, /\.ts/)

  //调用keys方法返回一个相对于main目录的ts文件路径的字符串数组，如 ["./analysis/dashboard.ts", "./analysis/overview.ts"...]
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]) //引入指定路径的文件，返回一个module对象
    allRoutes.push(route.default) //将每个module中default导出的对象添加到allRoutes数组中
  })

  // 2. 根据userMenus获取需要的route对象
  function _recuresGetRoute(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu //如果没有赋值过则赋值，否则不赋值保证只有第一个对象赋值
        }
      } else {
        _recuresGetRoute(menu.children)
      }
    }
  }
  _recuresGetRoute(userMenus)
  return routes
}

/**
 *  封装根据一个根据路径从userMenus中查找对应的对象的函数
 */

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: breadsumbType[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

/**
 * 封装一个将路径映射成面包屑的函数
 */

export function mapPathToBread(
  userMenus: any[],
  currentPath: string
): breadsumbType[] {
  const breadcrumbs: breadsumbType[] = []

  mapPathToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

/**
 * 封装函数遍历userMenus中每个对象（所有层级的对象），将其权限组成新数组
 */
export function mapMenusToPermission(userMenus: any[]) {
  const permissions: string[] = []
  function _recurseGetPermission(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

/**
 * 封装一个menuList对象数组中最底层的对象的id遍历出来成数组的函数
 */
export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  function _recurseGetLeaf(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leafKeys
}

export { firstMenu }
