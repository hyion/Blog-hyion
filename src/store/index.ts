import { getUserinfo } from '/@/api/user'
import { createStore, Store } from 'vuex'
import { userInfo } from 'os'
// import {} from '@types'
interface IState {
  showPageLoadScrollBar: boolean,
  userInfo: any
}

const state: IState = {
  showPageLoadScrollBar: false,
  userInfo: {}
}

const app = createStore({
  state,
  getters: {
    isShowPageLoadScrollBar(state: any) {
      return state.showPageLoadScrollBar
    },
    user(state: any) {
      return state.userInfo
    }
  },
  mutations: {
    setShowPageLoadScrollBar(state: any, data: boolean) {
      state.showPageLoadScrollBar = data
    }
  },
  actions: {
    async getUserData() {
      const res:any = await getUserinfo()
      state.userInfo = res.body
    }
  },
  modules: {}
})
export default app
