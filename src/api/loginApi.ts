import { Login } from '../types/api'
import request from '../utils/request'

const api = {
  login(params: Login.CreateParams) {
    return request.post<{ token: string; userInfo: { avatar: string; name: string } }>('/login', params)
  }
}

export default api
