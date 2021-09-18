import request from '@/utils/request'

export function getMicroApps() {
  return request({
    url: '/system/account/app',
    method: 'get'
  })
}
