<template>
  <div class="container">
    <!-- 头部start -->
    <div class="header">
      <van-icon size="30" @click="goBack" name="arrow-left" class="header-icon" />
      订单详情
    </div>
    <!-- 头部end -->

    <!-- 状态栏 -->
    <StatusBar :item="stateMap[orderDetail?.trade_state || 40]" />

    <!-- 订单状态start -->
    <div class="state-content">
      <div class="content-one">订单待支付</div>
      <div class="content-two" v-if="orderDetail.trade_state === '待支付'">
        请在
        <RemainTime :time="times" />
        内完成支付,超时订单自动取消
      </div>
      <van-button type="success" class="btn">立即支付(0.5元)</van-button>
    </div>
    <!-- 订单状态end -->
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import api from '../../api/api'
  import { computed, onMounted, reactive } from 'vue'
  import { Order, stringKey } from '../../types/api'
  import RemainTime from '../../components/remainTime.vue'

  onMounted(() => {
    getOrderDetail()
  })

  const times = computed(() => {
    console.log(orderDetail.order_start_time)
    return orderDetail.order_start_time
  })

  //创建路由实例
  const router = useRouter()
  const route = useRoute()

  //获取订单详情
  const getOrderDetail = async () => {
    const oid = route.query.oid
    const data = await api.getOrderDetail(oid)
    Object.assign(orderDetail, data)
  }

  //StatuBar状态值
  const stateMap: stringKey = {
    待支付: 10,
    待服务: 20,
    已完成: 30,
    已取消: 40
  }

  //订单详情参数
  const orderDetail = reactive<Order.OrderDetail>({
    companion_id: 0,
    demand: '',
    hospital_id: 0,
    hospital_name: '',
    order_start_time: 0,
    out_trade_no: '',
    paidPrice: '',
    price: '',
    receiveAddress: '',
    serviceImg: '',
    service_name: '',
    service_state: '',
    starttime: '',
    tel: '',
    time_end: '',
    trade_state: '',
    transaction_id: '',
    user_id: '',
    code_url: '',
    client: {
      id: 0,
      mobile: '',
      name: ''
    }
  })

  //返回上一页
  const goBack = () => {
    router.go(-1)
  }
</script>

<style scoped lang="less">
  .container {
    background-color: #f0f0f0;
    height: 100vh;
    position: relative;
    .header {
      position: relative;
      padding: 10px 0;
      font-size: 15px;
      text-align: center;
      .header-icon {
        position: absolute;
        top: 5px;
        left: 5px;
      }
    }
    .state-content {
      padding: 20px;
      color: #767370;
      .content-one {
        font-size: 20px;
        font-weight: 700;
      }
      .content-two {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        line-height: 20px;
        font-size: 14px;
      }
      .btn {
        width: 100%;
        margin: 10px 0;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
</style>
