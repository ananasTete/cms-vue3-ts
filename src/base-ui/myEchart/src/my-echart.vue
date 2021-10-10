<template>
  <div class="my-echart">
    <div ref="echartsRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'
import { EChartsOption } from 'echarts'

export default defineComponent({
  name: '',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    options: {
      type: Object as PropType<EChartsOption>,
      require: true
    }
  },
  setup(props) {
    const echartsRef = ref<HTMLElement>()

    //因为setup执行时还没有挂载DOM,echartsRef.value拿不到DOM值为空
    //所以要写在mounted中

    onMounted(() => {
      const { setOptions } = useEchart(echartsRef.value!)

      //监听配置对象的改变，改变后重新配置
      watchEffect(() => {
        setOptions(props.options!)
      })
    })

    return {
      echartsRef
    }
  }
})
</script>

<style scoped lang="less"></style>
