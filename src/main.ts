import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import store from './utils/stroage'
import { showToast } from 'vant'

router.beforeEach((to, from) => {
  const token = store.get('h5Token')
  //非登录页面判断
  if (!token && to.path !== '/login') {
    if (from.matched.length > 0) {
      showToast({ type: 'fail', message: '请重新登录', forbidClick: true })
    }
    return '/login'
  } else {
    return true
  }
})
const app = createApp(App)

app.use(router)

app.mount('#app')
