/**
 * 工具类
 */

//时间戳恢复
//1722930765000
import { format } from 'date-fns'
export const formatData = (timestamp?: number | string) => {
  if (!timestamp) {
    const timestamps = new Date()
    return format(timestamps, 'yyyy-MM-dd  HH:mm:ss')
  }
  const date = new Date(timestamp)
  return format(date, 'yyyy-MM-dd HH:mm:ss')
}

export const formatDatas = (timestamp?: number | string) => {
  if (!timestamp) {
    const timestamps = new Date()
    return format(timestamps, 'yyyy-MM-dd')
  }
  const date = new Date(timestamp)
  return format(date, 'yyyy-MM-dd')
}
