<template>
  <div class="dashboard">
    <!--gutter: 每个el-col之间的间隔-->
    <el-row :gutter="10">
      <el-col :span="8">
        <my-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </my-card>
      </el-col>
      <el-col :span="9">
        <my-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <my-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import MyCard from '@/base-ui/myCard'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
import { myUseStore } from '@/store'

export default defineComponent({
  components: {
    MyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  name: 'dashboard',
  setup() {
    //分发获取echarts要展示的数据的action，保存到dashboardModule模块
    const store = myUseStore()
    store.dispatch('dashboardModule/getDashboardDataAction')

    //从vuex中获取图表数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const listData: any[] = []

      const saleResult = store.state.dashboardModule.categoryGoodsSale
      for (const item of saleResult) {
        xLabels.push(item.name)
        listData.push(item.goodsCount)
      }
      return { xLabels, listData }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const listData: any[] = []

      const favorResult = store.state.dashboardModule.categoryGoodsFavor
      for (const item of favorResult) {
        xLabels.push(item.name)
        listData.push(item.goodsFavor)
      }
      return { xLabels, listData }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 10px;
}
</style>
