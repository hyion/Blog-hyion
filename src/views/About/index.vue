<template>
  <div class="about-page">
    <hy-header />
    <div class="content markdown-body">
      <div v-html="content"></div>
    </div>
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

<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getMyself } from '/@/api/articles'
import marked from 'marked'

export default defineComponent({
  setup() {
    const state = reactive({
      isShow: false,
      datas: {},
      content: ''
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

    const markdownRender = (data: any) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
      state.content = marked(data)
    }

    const getData = async () => {
      const res: any = await getMyself()
      state.content = res.body
      markdownRender(state.content)
      console.log('datas--', state.content)
    }

    onMounted(() => {
      getData()
    })

    return { onCounte, ...toRefs(state) }
  },
})
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
