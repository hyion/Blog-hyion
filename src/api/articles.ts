import Service from './service'

export function articleList(data?: any) {
  return Service({
    url: data ? 'article/' : `article/?from=list`,
    method: 'get',
    data: data
  })
}

export function article(data?: any) {
  return Service({
    url: `article/${data}`,
    method: 'get'
  })
}

export function articleLike(data: any) {
  return Service({
    url: `article_like/${data}`,
    method: 'put'
  })
}
