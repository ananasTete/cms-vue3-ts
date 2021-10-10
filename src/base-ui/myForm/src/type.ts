export interface ItemType {
  field: string
  type: 'input' | 'password' | 'select' | 'datepicker'
  label: string
  rules?: any[]
  placeholder?: any
  //针对select类型
  options?: any[]
  //针对特殊属性
  otherOptions?: any
  //是否隐藏该组件
  isHidden?: boolean
}

export interface FormType {
  formItem: ItemType[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
