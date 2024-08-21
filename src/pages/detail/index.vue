<template>
  <div class="container">
    <!-- 头部start -->
    <div class="header">
      <van-icon size="30" @click="goBack" name="arrow-left" class="header-icon" />
      订单详情
    </div>
    <!-- 头部end -->

    <!-- 状态栏 -->
    <StatusBar item="0" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  //创建路由实例
  const router = useRouter()

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
  }
</style>
