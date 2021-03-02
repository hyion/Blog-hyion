import { getUserinfo } from '@/api/user'
import { createStore, Store } from 'vuex'
import { userInfo } from 'os'
// import {} from '@types'
interface IState {
  showPageLoadScrollBar: boolean
  userInfo: any
}

const state: IState = {
  showPageLoadScrollBar: false,
  userInfo: sessionStorage.getItem('user')
    ? JSON.parse(JSON.stringify(sessionStorage.getItem('user')))
    : {},
}

const app = createStore({
  state,
  getters: {
    isShowPageLoadScrollBar(state: any) {
      return state.showPageLoadScrollBar
    },
    user(state: any) {
      return state.userInfo
    },
  },
  mutations: {
    setShowPageLoadScrollBar(state: any, data: boolean) {
      state.showPageLoadScrollBar = data
    },
  },
  actions: {
    getUserData() {
      return new Promise(async (resolve) => {
        const res: any = await getUserinfo()
        state.userInfo = res.body
        sessionStorage.setItem('user', JSON.stringify(res.body))
        resolve(res.body)
      })
    },
  },
  modules: {},
})
export default app
