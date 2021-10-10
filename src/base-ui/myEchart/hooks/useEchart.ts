/**
 * 封装echarts
 */

import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

//为地图图表注册中国地图数据
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 1. 创建一个echarts实例并绑定到参数DOM上
  const echartInstance = echarts.init(el)

  // 2. 定义一个给echarts实例设置option的函数，并导出
  function setOptions(options: echarts.EChartsOption) {
    echartInstance.setOption(options)
  }

  //监听窗口的缩放，窗口缩放时图表也跟随缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  //定义一个手动设置图表缩放的函数,比如侧边栏收缩不属于window的resize事件
  function updateSize() {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
