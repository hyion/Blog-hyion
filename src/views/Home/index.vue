<template>
  <div class="layout-container">
    <div class="layout-center">
      <Center />
    </div>
    <div class="layout-bg"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Center from './children/center.vue'

export default defineComponent({
  components: { Center },
})
</script>

<style lang="scss" scoped>
@keyframes shadow {
  0% { background-position-x: 0%;}
  50% { background-position-x: 100%; }
  100% { background-position-x: 0%;}
}

.layout-container {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: all 0.5s;
  z-index: 8;
  .layout-center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
  .layout-bg {
    width: 100%;
    height: 100vh;
    animation: shadow 15s infinite;
    background: linear-gradient(125deg,#2980b9,#633bd3,#8e44ad,#192f44,#27ae60);
    background-size: 800%;
    z-index: -99;
  }
}
</style>
