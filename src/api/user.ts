import Service from './service'

export function getUserinfo() {
  return Service({
    url: 'info',
    method: 'get'
  })
}
