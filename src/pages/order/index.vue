<template>
  <div class="container">
    <div class="header"><h4>我的订单</h4></div>
    <van-tabs v-model:active="active" animated @click="onChangeActive">
      <van-tab title="全部" name="" />
      <van-tab title="待支付" name="1" />
      <van-tab title="待服务" name="2" />
      <van-tab title="已完成" name="3" />
      <van-tab title="已取消" name="4" />
    </van-tabs>
    <van-row v-for="item in orderList" :key="item.out_trade_no" class="content-row" @click="goPage(item)">
      <van-col span="6" class="col-one">
        <van-image width="50" height="50" radius="5" :src="item.serviceImg" />
      </van-col>
      <van-col span="13">
        <div class="text-one">{{ item.service_name }}</div>
        <div class="text-two">{{ item.hospital_name }}</div>
        <div class="text-two">预约时间:{{ item.starttime }}</div>
      </van-col>
      <van-col span="5" class="col-third" :style="{ color: stateColor[item.trade_state] }">
        <div>{{ item.trade_state }}</div>
        <div v-if="item.trade_state === '待支付'"><RemainTime :time="item.order_start_time" /></div>
      </van-col>
    </van-row>
    <div class="no-data">没有更多了</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import api from '../../api/api'
  import { Order } from '../../types/api'
  import RemainTime from '../../components/remainTime.vue'
  import { useRoute, useRouter } from 'vue-router'

  onMounted(() => {
    active.value = (route.query.state as string) || ''
    getOrderList(active.value.toString())
  })

  //创建路由实例
  const router = useRouter()
  const route = useRoute()

  //订单列表数据
  const orderList = ref<Order.Params[]>([])

  const active = ref('')

  //切换页签重置数据
  const onChangeActive = () => {
    getOrderList(active.value.toString())
  }

  //获取数据
  const getOrderList = async (state?: string) => {
    const data = await api.getOrderList(state)
    orderList.value = data
  }

  //颜色切换
  type stringKey = Record<string, string | number>
  const stateColor: stringKey = {
    待支付: '#ffa200',
    待服务: '#1da6fd',
    已完成: '21c521',
    已取消: '#a3a0a0'
  }

  //点击跳转
  const goPage = (val: Order.Params) => {
    router.push(`/detail?oid=${val.out_trade_no}`)
  }
</script>

<style scoped lang="less">
  .container {
    background-color: #f0f0f0;
    min-height: 100vh;
  }
  .header {
    background-color: #fff;
    text-align: center;
    padding: 20px;
  }
  .content-row {
    position: relative;
    background-color: #fff;
    margin: 8px 5px;
    padding: 5px;
    border-radius: 5px;
    .col-one {
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    .col-third {
      font-size: 14px;
    }

    .text-one {
      font-weight: 700;
    }
    .text-two {
      color: #a6aca9;
      font-size: 14px;
    }
  }
  .no-data {
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin-bottom: 50px;
    color: #a6aca9;
  }
</style>
