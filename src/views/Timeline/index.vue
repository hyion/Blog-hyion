<template>
  <div class="timeline-wrapper">
    <!-- <section class="timeline">
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
    </section> -->
    <header id="header">
      <div class="view">
        <img src="https://assets.codepen.io/2002878/bilibili-winter-view-1.jpg" class="morning" alt="">
        <img src="https://assets.codepen.io/2002878/bilibili-winter-view-2.jpg" class="afternoon" alt="">
        <video autoplay loop muted class="evening">
          <source src="https://assets.codepen.io/2002878/bilibili-winter-view-3.webm" type="video/webm" />
        </video>
        <img src="https://assets.codepen.io/2002878/bilibili-winter-view-3-snow.png" class="window-cover" alt="">
      </div>
      
      <div class="tree">
        <img src="https://assets.codepen.io/2002878/bilibili-winter-tree-1.png" class="morning" alt="">
        <img src="https://assets.codepen.io/2002878/bilibili-winter-tree-2.png" class="afternoon" alt="">
        <img src="https://assets.codepen.io/2002878/bilibili-winter-tree-3.png" class="evening" alt="">
      </div>
    </header>
    <Articles />
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import MAIN_URL from '@/assets/images/main.png'
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

    // 从vuex中取出用户信息
    const user: any = sessionStorage.getItem('user')
    state.userInfo = JSON.parse(user)

    onMounted(() => {
      let startingPoint: number
      const header = document.querySelector('#header') as HTMLElement

      header.addEventListener('mouseenter', (e) => {
        startingPoint = e.clientX
        header.classList.add('moving')
      })

      header.addEventListener('mouseout', (e) => {
        header.classList.remove('moving')
        header.style.setProperty('--percentage', '0.5')
      })

      header.addEventListener('mousemove', (e) => {
        let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5
        
        header.style.setProperty('--percentage', String(percentage))
      })
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
  background-color: #f2f5f7;
}

header {
  height: 250px;
  position: relative;
  overflow: hidden;
  --percentage: 0.5;
}

header .view, header .tree {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

header img, header video {
  position: absolute;
  display: block;
  width: 120%;
  height: 100%;
  object-fit: cover;
}

header .morning {
  z-index: 20;
  opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

header .afternoon {
  z-index: 10;
  opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

header .view {
  transform: translatex(calc(var(--percentage) * 100px));
}

header .tree {
  transform: translatex(calc(var(--percentage) * 50px));
  filter: blur(3px);
}

header .view,
header .tree,
header .morning,
header .afternoon {
  transition: .2s all ease-in;
}

header.moving .view,
header.moving .tree,
header.moving .morning,
header.moving .afternoon {
  transition: none;
}

header .window-cover {
  opacity: calc((var(--percentage) - 0.9) / 0.1);
}
</style>

