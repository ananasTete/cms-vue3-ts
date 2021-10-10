import { myUseStore } from '@/store'

export function usePermission(
  pageName: string | undefined,
  handleName: string
) {
  const store = myUseStore()
  const permissions = store.state.loginModule.permissions
  //判断权限数组中是否有指定权限，返回布尔类型
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)
}

//!!为其它类型到布尔类型的隐式转换
