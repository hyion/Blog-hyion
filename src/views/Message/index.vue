<template>
  <div class="message-page">
    <hy-header title="留言板" />
    <section class="content">
      <div v-if="data.length === 0">空无一物，就像你我一样。</div>
      <template v-else>
        <div v-for="(item, index) in data" :key="index" class="item">
          <div class="text" v-html="item.contentHtml"></div>
          <div class="time">{{ item.time }}</div>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, onMounted } from 'vue'
import { getMessage } from '@/api/user'

export default defineComponent({
  setup() {
    const state = reactive({
      data: []
    })

    const getData = async () => {
      const res: any = await getMessage()
      // console.log('getData--', res)
      state.data = res.body.data
      console.log(state.data)
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

<style lang="scss" scoped>
.message-page {
  position: relative;
  margin: 60px auto 0;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  height: 100%;
  min-height: 100vh;
  .content {
    width: 90%;
    margin: auto;
    padding: 50px 0;
    .item {
      margin-bottom: 30px;
      background: #fff;
      padding: 30px 30px 20px;
      border-radius: 6px;
      transition: all 0.3s;
      box-sizing: border-box;
      border-bottom: 1px solid #f3fafd;
      &:hover {
        box-shadow: 0 1px 8px rgba(0, 132, 255, 0.3);
      }
      .text {
        color: #333;
        &::deep .hljs-right {
          text-align: right;
        }
      }
      .time {
        font-size: 13px;
        text-align: right;
        margin-top: 14px;
        color: #888;
      }
    }
  }
}
</style>
