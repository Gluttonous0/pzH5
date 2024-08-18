<template>
  <h1>用户登录</h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.passWord"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div class="btn">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import api from '../../api/api'
  import { closeToast, showToast } from 'vant'
  import store from '../../utils/stroage'
  import { useRouter } from 'vue-router'

  //路由跳转
  const router = useRouter()

  //绑定form表单数据
  const form = reactive({
    userName: '17677172453',
    passWord: '123123'
  })

  //提交按钮
  const onSubmit = async () => {
    try {
      const data = await api.login(form)
      store.set('h5Token', data.token)
      store.set('h5UserInfo', data.userInfo)
      showToast({ type: 'success', message: '登录成功' })
      setTimeout(() => {
        closeToast()
        router.push('/home')
      }, 800)
    } catch (error) {
      console.log(error)
      showToast({ type: 'fail', message: '账号或密码错误' })
    }
  }
</script>
<style scoped lang="less">
  h1 {
    margin-top: 20px;
    text-align: center;
  }
  .btn {
    margin: 16px;
  }
</style>
