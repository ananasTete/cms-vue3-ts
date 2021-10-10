<template>
  <div class="pie-echart">
    <my-echart :options="options"></my-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { DataType } from '../types'
import MyEchart from '@/base-ui/myEchart'

export default defineComponent({
  components: { MyEchart },
  name: '',
  props: {
    pieData: {
      type: Array as PropType<DataType[]>,
      require: true
    }
  },
  setup(props) {
    //定义配置对象，其中有些配置固定的，有些配置是请求而来的，通过props传到本组件
    //给my-echart组件绑定的是此对象，但对象中的props数据变化时不会引起
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData, //从props获取数据
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })

    return {
      options
    }
  }
})
</script>

<style scoped lang="less"></style>
