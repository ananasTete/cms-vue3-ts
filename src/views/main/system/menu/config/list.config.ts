export const tableFormConfig = {
  //列配置
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '160', slotName: 'name' },
    // {
    //   prop: 'type',
    //   label: '类型',
    //   minWidth: '60',
    //   slotName: 'type'
    // },
    {
      prop: 'url',
      label: '菜单路径',
      minWidth: '120',
      slotName: 'url'
    },
    { prop: 'icon', label: '菜单图标', minWidth: '80', slotName: 'icon' },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '120',
      slotName: 'permission'
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
  showColSelect: true,
  //多级表格的配置
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  //是否显示footer
  showFooter: false
}
