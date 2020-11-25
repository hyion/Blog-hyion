<template>
  <div class="about-page">
    <hy-header />
    <a-button type="primary" @click="onCounte('12')"> Primary </a-button>
    <p>about</p>
    <p>isShowPageLoadScrollBar: {{ isShow }}</p>
    <div class="out-box">
      <ul>
        <li>1</li>
        <li>0</li>
        <li>2</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const state = reactive({
      isShow: false,
    })
    const store = useStore()
    // const isShowPageLoadScrollBar = store.getters.isShowPageLoadScrollBar
    // console.log(store.getters.isShowPageLoadScrollBar)
    const onCounte = (e) => {
      // console.log(e)
      store.commit('setShowPageLoadScrollBar', !store.getters.isShowPageLoadScrollBar)
      // console.warn(store)
      state.isShow = store.getters.isShowPageLoadScrollBar
    }
    // console.log(isShowPageLoadScrollBar)

    return { onCounte, ...toRefs(state) }
  },
}
</script>

<style lang="scss" scoped>
.about-page {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  height: 100%;
  min-height: 100vh;
  .out-box {
    ul {
      display: flex;
      justify-content: center;
      li {
        list-style: none;
        margin: 20px;
        font-size: 80px;
        position: relative;
        top: 0px;
        color: #eee;
      }
    }
  }

  .out-box li:nth-child(1) {
    animation: myMove 1.5s ease alternate infinite;
  }
  .out-box li:nth-child(2) {
    animation: myMove 1.5s ease 0.5s alternate infinite;
  }
  .out-box li:nth-child(3) {
    animation: myMove 1.5s ease 1s alternate infinite;
  }
  .out-box li:nth-child(4) {
    animation: myMove 1.5s ease 1.5s alternate infinite;
  }

  @keyframes myMove {
    0% {
      color: rgb(229, 255, 80);
      top: 160px;
      transform: rotateY(0deg) scale(1);
    }
    50% {
      color: rgb(2, 150, 200);
      top: 0px;
      transform: rotateY(180deg) scale(1.5);
    }
    100% {
      color: rgb(255, 106, 198);
      top: 160px;
      transform: rotateY(0deg) scale(1);
    }
  }
}
</style>
