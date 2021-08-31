import request from '@/utils/request'

export function saveGroup(group) {
  return request({
    url: '/system/group',
    method: 'post',
    data: group
  })
}

export function getGroup(id) {
  return request({
    url: '/system/group/' + id,
    method: 'get'
  })
}

export function getTree() {
  return request({
    url: '/system/group/fullTree',
    method: 'get'
  })
}
