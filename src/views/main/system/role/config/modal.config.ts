import { FormType } from '@/base-ui/myForm'

export const modalFormConfig: FormType = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ],
  labelWidth: '80px',
  itemStyle: {
    padding: '0 10px'
  },
  colLayout: {
    sapn: 24
  }
}
