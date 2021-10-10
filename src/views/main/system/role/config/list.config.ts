export const tableFormConfig = {
  //列配置
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100', slotName: 'name' },
    {
      prop: 'intro',
      label: '权限介绍',
      minWidth: '100',
      slotName: 'realname'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  //是否显示行号
  showColIndex: true,
  //是否显示选择框
  showColSelect: true
}
