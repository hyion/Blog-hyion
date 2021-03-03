<template>
  <div class="timeline-wrapper">
    <header id="header" :style="styleObj">
      <div class="view">
        <img :src="winter_view_1" class="morning" alt="">
        <img :src="winter_view_2" class="afternoon" alt="">
        <video autoplay loop muted class="evening">
          <source :src="winter_view_3" type="video/webm">
        </video>
        <img :src="winter_view_3_snow" class="window-cover" alt="">
      </div>
      
      <div class="tree">
        <img :src="winter_tree_1" class="morning" alt="">
        <img :src="winter_tree_2" class="afternoon" alt="">
        <img :src="winter_tree_3" class="evening" alt="">
      </div>
    </header>
    <Articles />
    <hy-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import MAIN_URL from '@/assets/images/main.png'
import winter_view_1 from '@/assets/images/bilibili-winter-view-1.webp'
import winter_view_2 from '@/assets/images/bilibili-winter-view-2.webp'
import winter_view_3 from '@/assets/images/bilibili-winter-view-3.webm'
import winter_view_3_snow from '@/assets/images/bilibili-winter-view-3-snow.png'
import winter_tree_1 from '@/assets/images/bilibili-winter-tree-1.webp'
import winter_tree_2 from '@/assets/images/bilibili-winter-tree-2.webp'
import winter_tree_3 from '@/assets/images/bilibili-winter-tree-3.webp'
import Articles from './List.vue'
import { useStore } from 'vuex'
// import { IState } from './interface'

export default defineComponent({
  components: { Articles },
  setup() {
    const state = reactive({
      imgWidth: 0,
      imgHeight: 0,
      imageUrl: MAIN_URL,
      winter_view_1,
      winter_view_2,
      winter_view_3,
      winter_view_3_snow,
      winter_tree_1,
      winter_tree_2,
      winter_tree_3,
      date: {
        month: 0,
        day: 0,
        year: 0
      },
      userInfo: null,
      width: window.innerWidth,
      styleObj: {
        height: '130px'
      }
    })

    const store = useStore()

    // 从vuex中取出用户信息
    const user: any = sessionStorage.getItem('user')
    state.userInfo = JSON.parse(user)

    onMounted(() => {
      if (state.width > 1200) {
        state.styleObj.height = `${parseInt(String(state.width / 13))}px` 
      }
      console.log(state.styleObj, state.width)
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

