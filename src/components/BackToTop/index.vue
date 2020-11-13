<template>
  <div class="to-top-container" v-if="isTop">
    <button class="btn to-top-btn" title="返回顶部" @click="onTop">
      <i class="el-icon-download icon"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onBeforeUnmount } from 'vue'
interface IState {
  isTop: boolean,
  isMoving: boolean,
  interval: any,
  backPosition: number
}
export default defineComponent({
  setup() {
    const state = reactive<IState>({
      isTop: false,
      isMoving: false,
      interval: null,
      backPosition: 0
    })
    const onScroll = (e: any) => {
      const scop: number = document.documentElement.scrollTop
      if (scop >= 200) {
        state.isTop = true
      } else {
        state.isTop = false
      }
    }
    window.addEventListener('scroll', onScroll)

    onBeforeUnmount(() => { // 实例销毁前移除scroll监听事件
      window.removeEventListener('scroll', onScroll)
    })

    // 渐变运动速率曲线, t: 已过时间; b: 初始值; c: 距离; d: 总时间
    let easeInOutQuad = (t: number, b: number, c: number, d:number) => {
      // (t /= d / 2) 即为t = t/(d/2)的一元运算符写法
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }

    let handler = () => {
      const start = window.pageYOffset
      let i = 0
      state.isMoving = true
      state.interval = setInterval(() => {
        const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500))
        if (next <= state.backPosition) {
          window.scrollTo(0, state.backPosition)
          clearInterval(state.interval)
          state.isMoving = false
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    }

    const onTop = () => {
      handler()
    }

    return {
      ...toRefs(state),
      onTop
    }
  }
})
</script>

<style lang="scss" scoped>
.to-top-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  .btn {
    margin: 10px 0 0;
    padding: 0;
    width: 40px;
    height: 40px;
    line-height: 1;
    color: var(--colorLightGray);
    background-color: #fff;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, .05);
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      transform: scale(1.07);
    }
    .icon {
      transform: rotate(180deg);
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
