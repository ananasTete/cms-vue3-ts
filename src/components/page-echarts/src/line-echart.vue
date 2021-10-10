<template>
  <div class="">
    <my-echart :options="options"></my-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import MyEchart from '@/base-ui/myEchart'

export default defineComponent({
  components: { MyEchart },
  name: '',
  props: {
    xLabels: {
      type: Array as PropType<string[]>,
      require: true
    },
    listData: {
      type: Array as PropType<any[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xLabels //props中传来的数据
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: props.listData, //props中传来的数据
            type: 'line',
            areaStyle: {}
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
