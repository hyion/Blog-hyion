import Service from './service'

export function articleList(data?: any) {
  return Service({
    url: 'article',
    method: 'get',
    data: data ? data : { from: 'list' }
  })
}

export function article(data?: any) {
  return Service({
    url: `article/${data}`,
    method: 'get'
  })
}