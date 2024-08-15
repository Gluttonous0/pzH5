<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="(item, index) in tabList"
      :key="item.path"
      @click="handleNewPage(item.path, index)"
      :icon="item.meta.icon"
    >
      {{ item.meta.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  onMounted(() => {
    tabList.value = router.options.routes[0].children
    active.value = tabList.value?.findIndex((item: any) => '/' + item.path === route.path) || 0
  })

  //获取路由
  const router = useRouter()
  const route = useRoute()

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
