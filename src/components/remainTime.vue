<template>
  {{ times }}
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  const props = defineProps(['time'])
  const endTime = props.time + 7200000

  const timeId = ref<NodeJS.Timeout[]>([])
  const nowTime = ref({
    hour: 0,
    minute: 0,
    second: 0
  })
  const times = computed(() => {
    return `0${nowTime.value.hour}:${nowTime.value.minute < 10 ? '0' + nowTime.value.minute : nowTime.value.minute}:${
      nowTime.value.second < 10 ? '0' + nowTime.value.second : nowTime.value.second
    }`
  })

  const handleTime = (time: number) => {
    clearInterval(timeId.value[0])
    timeId.value.splice(0, 1)
    const t = setInterval(() => {
      if (time + 7200000 - Date.now() <= 0) {
        nowTime.value.hour = 0
        nowTime.value.minute = 0
        nowTime.value.second = 0
        clearInterval(t)
      } else {
        const nowDate = Date.now()
        nowTime.value.hour = Math.floor((endTime - nowDate) / (1000 * 60 * 60))
        nowTime.value.minute = Math.floor(((endTime - nowDate) % (1000 * 60 * 60)) / (1000 * 60))
        nowTime.value.second = Math.floor(((endTime - nowDate) % (1000 * 60)) / 1000)
      }
      timeId.value.push(t)
    }, 1000)
  }
  handleTime(props.time)
</script>

<style lang="less" scoped></style>
