<template>
  <section class="header" :class="isShow ? 'bo-shadow' : ''">
    <div class="user left">
      用户
    </div>
    <div class="title">{{ title }}</div>
    <div class="right-menu f-flex">
      <div class="icon">
        <svg t="1605169953545" class="svg-icon circle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1172" width="20" height="20">
          <path d="M694.830025 110.467951c-76.670194 0-137.458675 38.335097-184.008874 101.313453-47.096644-62.978357-107.339704-101.313453-184.009897-101.313453-138.554636 0-251.372098 122.126478-251.372098 272.730545 0 89.814562 40.524972 152.793942 72.839959 203.178469 93.64582 147.31516 319.826166 305.58686 329.682651 313.254493 9.856485 7.667633 20.810978 10.951423 32.30987 10.951423 11.502985 0 22.454408-3.831258 32.30987-10.951423 9.860579-7.667633 236.036831-166.484755 330.23626-313.254493 32.30987-50.385551 72.833819-113.364931 72.833819-203.178469C945.653631 233.141898 832.842309 110.467951 694.830025 110.467951L694.830025 110.467951 694.830025 110.467951 694.830025 110.467951 694.830025 110.467951z" p-id="1173"></path>
        </svg>
      </div>
      <div class="icon">
        <svg t="1605170774156" class="svg-icon menu" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2042" width="20" height="20">
          <path d="M853.333333 938.666667h-213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333333-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333334 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333334 85.333334z m0-469.333334h-213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V170.666667c0-46.933333 38.4-85.333333 85.333333-85.333334h213.333333c46.933333 0 85.333333 38.4 85.333334 85.333334v213.333333c0 46.933333-38.4 85.333333-85.333334 85.333333zM384 938.666667H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333334-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334z m0-469.333334H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333333V170.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333334v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333333z" p-id="2043"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onBeforeUnmount } from 'vue'

interface IState {
  isShow: boolean,
  userInfo: any[] | string | (()=>string) | object
}
const Header = defineComponent({
  props: {
    title: {
      type: String,
      default: 'nginx 安装 并 配置gzip和br'
    }
  },
  setup() {
    const state = reactive<IState>({
      isShow: false,
      userInfo: {}
    })
    const onScroll = (e: any) => {
      const scop: number = document.documentElement.scrollTop
      if (scop >= 50) {
        state.isShow = true
      } else {
        state.isShow = false
      }
    }
    window.addEventListener('scroll', onScroll)

    onBeforeUnmount(() => { // 实例销毁前移除scroll监听事件
      window.removeEventListener('scroll', onScroll)
    })

    const user: any = sessionStorage.getItem('user')
    state.userInfo = JSON.parse(user)
    return {
      ...toRefs(state)
    }
  }
})
export default Header
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #f6f7f8;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--colorTitle);
  padding: 0 15px;
  background: #fff;
  z-index: 99999;
  transition: all 0.5s;
  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .right-menu {
    .icon {
      margin: 0 5px;
      .svg-icon {
        fill: var(--colorLight);
        cursor: pointer;
        transition: all .3s;
        &.circle:hover {
          fill: var(--colorComment);
          transform: scale(1.2);
        }
        &.menu:hover {
          fill: var(--colorGreen);
          transform: scale(1.2);
        }
      }
    }
  }
  &.bo-shadow {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .08);
  }
}
</style>