import { LocationQueryValue } from 'vue-router'
import { Companion, H5Home, Login, Order } from '../types/api'
import request from '../utils/request'

const api = {
  login(params: Login.CreateParams) {
    return request.post<{ token: string; userInfo: { avatar: string; name: string } }>('/login', params)
  },
  //首页数据
  getIndex() {
    return request.get<H5Home.Params>('/Index/index')
  },
  //订单详情
  getH5Companion() {
    return request.get<Companion.Params>('/h5/companion')
  },
  //创建订单
  createOrder(params: Order.CreateParams) {
    return request.post<{ wx_code: string }>('/createOrder', params)
  },
  //查询订单列表
  getOrderList(state?: string) {
    return request.get<Order.Params[]>('/order/list', { state })
  },
  //获取订单详情
  getOrderDetail(oid: string | LocationQueryValue | LocationQueryValue[]) {
    return request.get<Order.OrderDetail>('/order/detail', { oid })
  }
}

export default api
