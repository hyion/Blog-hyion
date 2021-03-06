export interface IDate {
  month: number,
  day: number,
  year: number
}

export interface IState {
  imgWidth: number,
  imgHeight: number,
  imageUrl: string,
  date?: IDate,
  userInfo: any
}

export interface IListState {
  datas: any[],
  wowNum: number,
  page: number
}
