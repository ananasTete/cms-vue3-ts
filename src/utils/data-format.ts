import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// 定义默认时间格式
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 将utc时间格式转换为目标时间格式的函数

export function utcFormat(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
  // 默认为0时区，北京(东八区)需要设置偏移量
}

//将时间戳格式转化为目标时间格式的函数

export function timestampFormat(
  timestamp: number,
  format: string = DATE_TIME_FORMAT
) {
  //dayjs只接受毫秒，以秒为单位的时间戳为10位，所以要进行判断转换
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000
  }
  return dayjs(timestamp).format(format)
}
