<template>
  <hy-scrollbar />
  <hy-loading :showLoading="loading" />
  <router-view v-slot="{ Component, route }">
    <!-- Use any custom transition and fallback to `fade` -->
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { reactive, computed, toRefs, provide, ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    // const data = getCurrentInstance()
    // console.log('getCurrentInstance--', data)
    // const state = reactive({
    //   loading: false
    // })
    const store = useStore()
    const loading = computed(() => store.getters.isShowPageLoadScrollBar)

    return { loading }
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  transition: all 0.6s ease-out;
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-active {
  transition: all 0.5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
</style>
