<template>
  <div class="button"></div>
  <div class="container">
    <!-- 头部start -->
    <div class="header">
      <van-icon size="30" @click="goBack" name="arrow-left" class="header-icon" />
      填写服务订单
    </div>
    <!-- 头部end -->

    <!-- 状态栏 -->
    <StatusBar item="0" />

    <div class="content">
      <!-- 服务内容start -->
      <van-cell title="单元格" class="cell-one">
        <template #title>
          <div class="cell-left">
            <van-space>
              <van-image width="25" height="25" :src="order.service.serviceImg" />
              {{ order.service.serviceName }}
            </van-space>
          </div>
        </template>
        <template #right-icon>
          <div>
            <van-space class="cell-right">
              <van-icon name="warning-o" />
              服务内容
            </van-space>
          </div>
        </template>
      </van-cell>
      <!-- 服务内容end -->

      <!-- 详细信息start -->
      <van-cell-group>
        <van-cell v-model="cellList.hospital_name" title="就诊医院" is-link @click="showHospital = true">
          <template #default>{{ cellList.hospital_name || '请选择医院' }}</template>
        </van-cell>
        <van-cell v-model="cellList.starttime" title="就诊时间" is-link @click="showNewData = true">
          <template #default>{{ formatDatas(cellList.starttime) || '请选择时间' }}</template>
        </van-cell>
        <van-cell v-model="companionName" title="陪护师" is-link @click="showCompanion = true">
          <template #default>{{ companionName || '请选择陪护师' }}</template>
        </van-cell>
        <van-cell center title="接送地址" :style="{ height: '44px' }">
          <template #default>
            <van-field v-model="cellList.receiveAddress" placeholder="请输入接送地址" input-align="right" />
          </template>
        </van-cell>
        <van-cell center title="联系电话" :style="{ height: '44px' }">
          <template #default>
            <van-field v-model="cellList.tel" placeholder="请输入联系电话" input-align="right" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="font-one">服务需求</div>
      <van-field
        type="textarea"
        v-model="cellList.demand"
        placeholder="请简单描述你要就诊的科室"
        :autosize="{ minHeight: 100 }"
      />
      <!-- 详细信息end -->
    </div>
    <van-button type="primary" class="btn" @click="submit">提交订单</van-button>
  </div>

  <!-- dialog层 -->
  <van-dialog v-model:show="showDia.state" :show-confirm-button="false">
    <div style="text-align: right">
      <van-icon size="20" name="cross" class="close" @click="closeCode" />
    </div>
    <div style="text-align: center; font-size: 20px">微信支付</div>
    <div class="dialog">
      <van-image :src="showDia.url" width="300px" height="300px" />
    </div>
  </van-dialog>

  <!-- 弹出层start -->
  <van-popup v-model:show="showHospital" position="bottom" :style="{ height: '40%' }">
    <van-picker :columns="hospitalColumns" @cancel="showHospital = false" @confirm="onChange" />
  </van-popup>
  <van-popup v-model:show="showNewData" position="bottom" :style="{ height: '40%' }">
    <van-date-picker
      v-model="currentDate"
      title="选择日期"
      :minDate="new Date(1949, 0, 1)"
      :maxDate="new Date(2099, 11, 31)"
      @cancel="showNewData = false"
      @confirm="onNewData"
    />
  </van-popup>
  <van-popup v-model:show="showCompanion" position="bottom" :style="{ height: '40%' }">
    <van-picker :columns="companionColumns" @cancel="showCompanion = false" @confirm="onCompanion" />
  </van-popup>
  <!-- 弹出层end -->
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import StatusBar from '../../components/statusBar.vue'
  import api from '../../api/api'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { Companion, Order } from '../../types/api'
  import { formatDatas } from '../../utils'
  import { showNotify } from 'vant'
  import qrcode from 'qrcode'

  onMounted(() => {
    getH5Companion()
  })

  //创建路由实例
  const router = useRouter()

  //获取订单详情
  const getH5Companion = async () => {
    const data = await api.getH5Companion()
    Object.assign(order, data)
  }
  //订单详情绑定
  const order = reactive({
    companion: <Companion.CompanionList[]>[],
    hospitals: <Companion.HospitalsList[]>[],
    service: <Companion.ServiceParams>{}
  })

  //van-cell----------
  //声明列表key,value的类型
  type stringKey = Record<string, string | number>
  //cell列表数据
  // const cellList: stringKey = reactive({
  //   hospital_id: '',
  //   hospital_name: '',
  //   starttime: new Date().getTime(),
  //   companion_id: 0,
  //   receiveAddress: '',
  //   tel: '',
  //   demand: ''
  // })
  const cellList: stringKey = reactive({
    hospital_id: 1,
    hospital_name: '湘雅分院',
    starttime: new Date().getTime(),
    companion_id: 153,
    receiveAddress: '阿萨德',
    tel: '阿斯达大叔大婶',
    demand: '阿斯达多大事'
  })

  //就诊医院下拉状态控制
  const showHospital = ref(false)

  //医院下拉数据绑定
  const hospitalColumns = computed(() => {
    return order.hospitals.map(item => {
      return { text: item.name, value: item.id }
    })
  })

  //选择医院功能
  const onChange = (val: any) => {
    cellList.hospital_id = val.selectedOptions[0].value
    cellList.hospital_name = val.selectedOptions[0].text
    showHospital.value = false
  }

  //日期下拉状态控制
  const showNewData = ref(false)

  //日期数据绑定
  const currentDate = ref([
    new Date().getFullYear().toString(),
    (new Date().getMonth() + 1).toString(),
    new Date().getDate().toString()
  ])

  //选择日期
  const onNewData = (val: any) => {
    cellList.starttime = new Date(val.selectedValues.join('-')).getTime()
    showNewData.value = false
  }

  //陪护师下拉状态控制
  const showCompanion = ref(false)

  //选中陪护师名称
  const companionName = ref('')

  //陪护师下拉数据绑定
  const companionColumns = computed(() => {
    return order.companion.map(item => {
      return { text: item.name, value: item.id }
    })
  })

  //选择陪护师功能
  const onCompanion = (val: any) => {
    cellList.companion_id = val.selectedOptions[0].value
    companionName.value = val.selectedOptions[0].text
    showCompanion.value = false
  }

  //dialog层-------
  // 弹窗状态控制
  const showDia = ref({ state: false, url: '' })

  //关闭窗口
  const closeCode = () => {
    showDia.value.state = false
    router.push('/order')
  }

  //提交按钮
  const submit = async () => {
    for (const key in cellList) {
      if (!cellList[key]) {
        showNotify({ message: '请填写完整内容' })
        return
      }
    }
    const newList = cellList as unknown as Order.CreateParams
    const data = await api.createOrder(newList)
    console.log(data)

    qrcode.toDataURL(data.wx_code).then((url: string) => {
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

    .content {
      margin: 5px 10px;
      .cell-one {
        margin-bottom: 5px;
        .cell-left {
          display: flex;
          align-items: center;
          line-height: 25px;
        }
        .cell-right {
          color: #928f8f;
        }
      }
      .font-one {
        margin: 20px 10px;
        color: #928f8f;
        font-size: 15px;
      }
    }
  }
  .btn {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
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
