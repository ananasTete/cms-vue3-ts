<template>
  <div class="rose-echart">
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
    roseData: {
      type: Array as PropType<DataType[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [15, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 3
            },
            label: {
              show: false
            },
            data: props.roseData //props传来的数据
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
