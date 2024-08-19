<template>
  <div class="container">
    <div class="header"><h4>我的订单</h4></div>
    <van-tabs v-model:active="active" animated @click="onChangeActive">
      <van-tab v-for="index in tabName.length" :title="tabName[index - 1]">
        <van-row v-for="item in orderList" :key="item.out_trade_no" class="content-row">
          <van-col span="6" class="col-one">
            <van-image width="50" height="50" radius="5" :src="item.serviceImg" />
          </van-col>
          <van-col span="13">
            <div class="text-one">{{ item.service_name }}</div>
            <div class="text-two">{{ item.hospital_name }}</div>
            <div class="text-two">预约时间:{{ item.starttime }}</div>
          </van-col>
          <van-col span="5" class="col-third">{{ item.trade_state }}</van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue'
  import api from '../../api/api'
  import { Order } from '../../types/api'

  onMounted(() => {
    getOrderList()
  })

  const orderList = ref<Order.Params[]>([])
  computed(() => {
    return getOrderList(active.value.toString())
  })
  const active = ref(0)
  const onChangeActive = () => {
    console.log(active.value)
    getOrderList(active.value.toString())
  }

  const getOrderList = async (state?: string) => {
    const data = await api.getOrderList(state)
    orderList.value = data
  }

  //tab页签名称
  const tabName = ['全部', '待支付', '待服务', '已完成', '已取消']
</script>

<style scoped lang="less">
  .container {
    background-color: #f0f0f0;
    height: calc(100vh - 50px);
  }
  .header {
    background-color: #fff;
    text-align: center;
    padding: 20px;
  }
  .content-row {
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
      color: #1c9cf7;
    }

    .text-one {
      font-weight: 700;
    }
    .text-two {
      color: #a6aca9;
      font-size: 14px;
    }
  }
</style>
