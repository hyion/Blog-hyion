<template>
  <div class="message-page">
    <hy-header />
    <section class="content">
      <div v-if="!data.data || data.data.length == 0">空无一物，就像你我一样。</div>
      <template v-else>
        <div v-for="(item, index) in data.data" :key="index" class="item">
          <div class="text" v-html="item.contentHtml"></div>
          <div class="time">{{item.time}}</div>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted } from 'vue'
import { getMessage } from '/@/api/user'

export default defineComponent({
  setup() {
    const state = reactive({
      data: null
    })
    
    const getData = async () => {
      const res: any = await getMessage()
      state.data = res.body
    }

    onMounted(() => {
      getData()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style>
.message-page {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  height: 100%;
  min-height: 100vh;
}
</style>