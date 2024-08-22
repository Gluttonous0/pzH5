<template>
  <div class="container">
    <!-- 我的头像start -->
    <div class="admin-one">
      <div><van-image width="100" height="100" :src="userInfo?.avatar" /></div>
      <div style="font-weight: 700">{{ userInfo?.name }}</div>
    </div>
    <!-- 我的头像end -->

    <!-- 我的订单start -->
    <div class="order-two">
      <van-cell>
        <template #default>
          <div class="order-header">
            <span style="color: #000">我的订单</span> <span style="color: #969799" @click="goOrderList(5)">全部</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(item, index) in stateName" :key="index" @click="goOrderList(index)">
              <van-image :src="`../../../public/images/od_${index + 1}0.png`" />
              <div>{{ item }}</div>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </div>
    <!-- 我的订单end -->

    <!-- cell  start -->
    <div class="cell-third">
      <van-cell title="服务对象管理" icon="user-o" is-link />
      <van-cell title="分享转发" icon="guide-o" is-link />
    </div>
    <!-- cell end -->

    <van-button type="danger" style="width: 100%" @click="goExit">退出登录</van-button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import store from '../../utils/stroage'
  import { useRouter } from 'vue-router'

  onMounted(() => {
    userInfo.value = store.get('h5UserInfo')
  })

  //路由实例获取
  const router = useRouter()

  //用户信息获取
  const userInfo = ref<{ name: string; avatar: string }>()

  //订单状态排列
  const stateName = ['待支付', '待服务', '已完成', '已取消']

  //订单页面跳转
  const goOrderList = (index: number) => {
    console.log(index)
    if (index === 5) {
      return router.push('/order')
    }
    router.push(`/order?state=${index + 1}`)
  }

  //退出登录
  const goExit = () => {
    store.clear()
    router.push('/login')
  }
</script>

<style scoped lang="less">
  .container {
    height: 100vh;
    background-color: #f0f0f0;
    padding: 15px 10px;
    .admin-one {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      padding: 50px 0;
      margin-bottom: 10px;
      border-radius: 10px;
    }
    .order-two {
      margin: 10px 0;
      padding: 5px;
      border-radius: 10px;
      background-color: #fff;
      .order-header {
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
      }
    }
    .cell-third {
      margin: 10px 0;
      padding: 5px;
      border-radius: 10px;
      background-color: #fff;
    }
  }
</style>
