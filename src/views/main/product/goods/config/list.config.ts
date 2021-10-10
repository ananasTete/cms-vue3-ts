export const tableFormConfig = {
  //列配置
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100', slotName: 'name' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '80',
      slotName: 'newPrice'
    },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'img' },
    { prop: 'address', label: '产地', minWidth: '80', slotName: 'address' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '120',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '120',
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
