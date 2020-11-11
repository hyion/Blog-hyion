<template>
    <div class="loading-mask" v-loading="showLoading" v-if="showLoading"></div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    showLoading: Boolean,
  }
}
</script>
<style lang="scss">
.loading-mask{
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index: 9999;
  // background-color:rgba(255,255,255,.3);
}
</style>
