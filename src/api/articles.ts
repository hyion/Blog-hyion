import Service from './service'

export function articleList() {
  return Service({
    url: 'article',
    method: 'get',
    data: { from: 'list' }
  })
}
