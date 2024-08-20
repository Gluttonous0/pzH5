<template>
  <div color="#ffa200">
    {{ times }}
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { format } from 'date-fns'

  const props = defineProps(['time'])
  const endTime = format(new Date(props.time + 7200000), 'HH:mm:ss').split(':')
  const timeId = ref<NodeJS.Timeout[]>([])
  const nowTime = ref({
    hour: 0,
    minute: 0,
    second: 0
  })
  const times = computed(() => {
    return `${nowTime.value.hour == 0 ? '00' : nowTime.value.hour}:${
      nowTime.value.minute == 0 ? '00' : nowTime.value.minute
    }:${nowTime.value.second == 0 ? '00' : nowTime.value.second}`
  })
  clearInterval(timeId.value[0])

  const handleTime = (time: number) => {
    const t = setInterval(() => {
      if (time + 7200000 - Date.now() <= 0) {
        nowTime.value.hour = 0
        nowTime.value.minute = 0
        nowTime.value.second = 0
        clearInterval(t)
      } else {
        const nowDate = format(new Date(Date.now()), 'HH:mm:ss').split(':')
        if (endTime[2] < nowDate[2] && endTime[1] > nowDate[1]) {
          nowTime.value.hour = parseInt(endTime[0]) - parseInt(nowDate[0])
          nowTime.value.minute = parseInt(endTime[1]) - 1 - parseInt(nowDate[1])
          nowTime.value.second = parseInt(endTime[2]) + 60 - parseInt(nowDate[2])
        } else if (endTime[2] < nowDate[2] && endTime[1] < nowDate[1]) {
          nowTime.value.hour = parseInt(endTime[0]) - 1 - parseInt(nowDate[0])
          nowTime.value.minute = parseInt(endTime[1]) - 1 + 60 - parseInt(nowDate[1])
          nowTime.value.second = parseInt(endTime[2]) + 60 - parseInt(nowDate[2])
        } else {
          nowTime.value.hour = parseInt(endTime[0]) - parseInt(nowDate[0])
          nowTime.value.minute = parseInt(endTime[1]) - parseInt(nowDate[1])
          nowTime.value.second = parseInt(endTime[2]) - parseInt(nowDate[2])
        }
        console.log('--------------------')

        console.log('endTime', endTime)
        console.log('nowDate', nowDate)
        console.log('--------------------')
      }
      timeId.value.push(t)
    }, 1000)
  }
  handleTime(props.time)
</script>

<style lang="less" scoped></style>
