<template>
  <div class="map-echart">
    <my-echart :options="options"></my-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { convertData } from '../utils/convert-data'
import { DataType } from '../types'
import MyEchart from '@/base-ui/myEchart'

export default defineComponent({
  components: { MyEchart },
  name: '',
  props: {
    mapData: {
      type: Array as PropType<DataType[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        backgroundColor: '#fff',
        title: {
          text: '全国销量统计',
          left: 'center',
          color: '#fff'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 0,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)'
            ]
          },
          color: '#fff'
        },
        geo: {
          map: 'china',
          roam: 'scale',
          emphasis: {
            areaColor: '#f4cccc',
            borderColor: 'rgb(9, 54, 95)',
            itemStyle: {
              areaColor: '#f4cccc'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.mapData),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
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
