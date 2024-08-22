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
    <div class="state-content" v-if="orderDetail.trade_state === '待支付'">
      <div class="content-one">订单待支付</div>
      <div class="content-two" v-if="orderDetail.trade_state === '待支付'">
        请在
        <RemainTime :time="times" />
        内完成支付,超时订单自动取消
      </div>
      <van-button type="success" class="btn" @click="getPrice(orderDetail.code_url)">立即支付(0.5元)</van-button>
    </div>

    <div class="state-content" v-if="orderDetail.trade_state === '已取消'">
      <div class="content-one">订单已取消</div>
      <div class="content-two">期待下次为您服务，如需帮助可咨询客服</div>
    </div>

    <div class="state-content" v-if="orderDetail.trade_state === '待服务'">
      <div class="content-one">正在为您安排服务专员</div>
      <div class="content-two">请在保持手机通畅,稍后将有服务专员与您联系</div>
    </div>

    <div class="state-content" v-if="orderDetail.trade_state === '已完成'">
      <div class="content-one">服务已完成</div>
      <div class="content-two">感谢您的使用，如有售后问题请联系客服</div>
    </div>
    <!-- 订单状态end -->

    <!-- 订单详情start -->
    <div class="content-detail">
      <div class="detail-header"><span>预约信息</span></div>
      <div class="detail-body">
        <van-cell title="预约服务" :value="orderDetail.service_name" />
        <van-cell title="就诊医院" :value="orderDetail.hospital_name" />
        <van-cell title="期望就诊时间" :value="orderDetail.starttime" />
        <van-cell title="就诊人" :value="orderDetail.client.name" />
        <van-cell title="就诊人电话" :value="orderDetail.client.mobile" />
        <van-cell title="接送地址" :value="orderDetail.receiveAddress" />
        <van-cell title="其他需求" :value="orderDetail.demand" />
      </div>
    </div>
    <!-- 订单详情end -->
    <!-- 订单信息start -->
    <div class="content-detail">
      <div class="detail-header"><span>订单信息</span></div>
      <div class="detail-body">
        <van-cell title="就诊人电话" :value="orderDetail.client.mobile" />
        <van-cell title="期望就诊时间" :value="orderDetail.starttime" />
        <van-cell title="应付金额" :value="orderDetail.price + '元'" />
        <van-cell title="订单编号" :value="orderDetail.out_trade_no" />
        <van-cell title="联系客服">
          <template #right-icon> <span style="color: #969799">疑问或投诉></span></template>
        </van-cell>
      </div>
    </div>
    <!-- 订单信息end -->
  </div>

  <!-- 支付弹窗 -->
  <van-dialog v-model:show="showDia.state" :show-confirm-button="false">
    <div style="text-align: right">
      <van-icon size="20" name="cross" class="close" @click="closeCode" />
    </div>
    <div style="text-align: center; font-size: 20px">微信支付</div>
    <div class="dialog">
      <van-image :src="showDia.url" width="300px" height="300px" />
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import api from '../../api/api'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { Order, stringKey } from '../../types/api'
  import RemainTime from '../../components/remainTime.vue'
  import qrcode from 'qrcode'

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

  //dialog层-------
  // 弹窗状态控制
  const showDia = ref({ state: false, url: '' })

  //关闭窗口
  const closeCode = () => {
    showDia.value.state = false
  }

  //打开支付窗口
  const getPrice = (val: string) => {
    qrcode.toDataURL(val).then((url: string) => {
      showDia.value.url = url
      showDia.value.state = true
    })
  }

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
    .content-detail {
      background-color: #fff;
      margin-bottom: 20px;
      .detail-header {
        font-weight: 700;
        padding: 10px;
        span {
          padding: 5px;
          border-left: 5px solid red;
        }
      }
      .detail-body {
        padding: 0 10px;
      }
    }
  }
  .dialog {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close {
    margin: 10px;
    text-align: right;
  }
</style>
