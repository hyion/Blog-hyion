<template>
  <transition name="fade" mode="out-in">
    <div class="load" v-show="getIsShow"></div>
  </transition>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageLoadScrollBar',
  setup() {
    const store = useStore()
    const getIsShow = computed(() => store.getters.isShowPageLoadScrollBar)

    return { getIsShow }
  },
})
</script>

<style lang="scss" scoped>
.load {
  position: fixed;
  top: 0;
  width: 100%;
  height: 4px;
  z-index: 100000;
  background-image: linear-gradient(
    90deg,
    #2ae0c8,
    #a2e1d4,
    #acf6ef,
    #fe6673,
    #e6e2c3,
    #e3c887,
    #fad8be,
    #fbb8ac,
    #bdf3d4,
    #cbf5fb
  );
  animation: move 2s linear infinite;
}
@keyframes move {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 100vw;
  }
}
</style>
