import Service from './service'

export function getUserinfo() {
  return Service({
    url: 'info',
    method: 'get'
  })
}

export function getMyself() {
  return Service({
    url: 'myself',
    method: 'get'
  })
}
