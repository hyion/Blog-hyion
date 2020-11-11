<template>
  <div>
    <a-button type="primary" @click="onCounte('12')">
      Primary
    </a-button>
    <p>about</p>
    <p>isShowPageLoadScrollBar: {{ isShow }}</p>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const state = reactive({
      isShow: false
    })
    const store = useStore()
    // const isShowPageLoadScrollBar = store.getters.isShowPageLoadScrollBar
    // console.log(store.getters.isShowPageLoadScrollBar)
    const onCounte = e => {
      // console.log(e)
      store.commit('setShowPageLoadScrollBar', !store.getters.isShowPageLoadScrollBar)
      // console.warn(store)
      state.isShow = store.getters.isShowPageLoadScrollBar
    }
    // console.log(isShowPageLoadScrollBar)

    return { onCounte, ...toRefs(state) }
  }
}
</script>

<style>

</style>
