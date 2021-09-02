import request from '@/utils/request'

export function getUserList(condition) {
  return request({
    url: '/system/user/page',
    method: 'post',
    data: condition
  })
}

export function login(data) {
  return request({
    url: '/system/account/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/system/user',
    method: 'get'
  })
}

export function logout(token) {
  const params = { token: token }
  return request({
    url: '/system/account/logout',
    method: 'post',
    params: params
  })
}
