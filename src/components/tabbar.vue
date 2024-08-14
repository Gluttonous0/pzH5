<template>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(item, index) in tabList" @click="handleNewPage(item.path, index)" :icon="item.meta.icon">
      {{ item.meta.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  onMounted(() => {
    tabList.value = router.options.routes[0].children
    console.log(tabList.value)
  })

  //获取路由
  const router = useRouter()
  console.log(router)

  //tabbbar---------------
  //选中状态
  const active = ref(0)

  //标签列数据
  const tabList = ref()

  //点击跳转页面
  const handleNewPage = (path: string, index: number) => {
    active.value = index
    router.push(path)
  }
</script>
<style scoped lang="less"></style>
