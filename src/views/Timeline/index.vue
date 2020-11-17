<template>
  <div class="timeline-wrapper">
    <section class="timeline">
      <div id="scene" class="layer">
        <div data-depth="0.4" >
          <img :src="imageUrl" class="move-img" :width="imgWidth" :height="imgHeight" >
        </div>
      </div>
      <div class="mask"></div>
      <div class="info">
        <div class="title f-flex align-center justify-center" v-if="userInfo">
          <img class="avatar" v-if="userInfo" :src="userInfo.avatar" alt="avatar">
          <span v-if="userInfo && userInfo.cover">{{ userInfo.cover.title }}</span>
        </div>
        <p class="content" v-if="userInfo && userInfo.cover">{{ userInfo.cover.describe }}</p>
      </div>
    </section>
    <Articles />
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
  </div>
</template>

<script lang="ts">
import Parallax from 'parallax-js'
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { getUserinfo } from '/@/api/user'
import MAIN_URL from '/@/assets/images/main.png'
import Articles from './List.vue'
import { useStore } from 'vuex'
import { IState } from './interface'

export default defineComponent({
  components: { Articles },
  setup() {
    const state = reactive<IState>({
      imgWidth: 0,
      imgHeight: 0,
      imageUrl: MAIN_URL,
      date: {
        month: 0,
        day: 0,
        year: 0
      },
      userInfo: null
    })

    const store = useStore()

    let wWidth: number = document.documentElement.clientWidth
    let wHeight: number = document.documentElement.clientHeight
    state.imgWidth = wWidth + 150
    state.imgHeight = wHeight + 150
    if (wWidth <= 600) { state.imgWidth = 1920 / 1.3; state.imgHeight = 960 }

    const initScene = () => {
      const scene = document.querySelector('#scene')
      const parallaxInstance = new Parallax(scene, {
        relativeInput: true,
        clipRelativeInput: true,
      })
    }

    // 从vuex中取出用户信息
    // state.userInfo = computed(() => JSON.parse(store.getters.user)))
    const user: any = sessionStorage.getItem('user')
    state.userInfo = JSON.parse(user)

    onMounted(() => {
      initScene()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.timeline-wrapper {
  overflow: hidden;
}
.timeline {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 29;
  .layer {
    width: 100%;
    height: 100%;
    pointer-events: none;
    .move-img {
      margin-bottom: 20px;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      max-width: none;
      display: block;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #4c50cf86;
    clip-path: polygon(0 0,25% 0,60% 100%,0 100%);
    pointer-events: none;
  }
  .info {
    position: absolute;
    top: 54%;
    left: 10%;
    color: #fff;
    width: 30%;
    transform: translateY(-50%);
    color: #ffffff;
    font-size: .5rem;
    .time {
      font-size: 14px;
    }
    .title {
      font-size: 0.8rem;
      margin: 15px 0;
      flex-direction: column;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transition: all 0.9s;
        animation: scaleLogo infinite 3s;
      }
    }
    .content {
      font-size: 15px;
      text-align: center;
    }
  }
}

@keyframes scaleLogo {
  0% {
    transform: rotate(0deg) scale(.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1);
    opacity: .8;
  }
  100% {
    transform: rotate(0deg) scale(.8);
    opacity: 1;
  }
}
</style>
