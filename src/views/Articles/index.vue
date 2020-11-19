<template>
  <div class="articles-page">
    <hy-header />
    <section class="articles-container">
      <div>
        <ul>
          <li v-for="itm in datas" :key="itm.id">
            {{ itm.title }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { articleList } from '/@/api/articles'

export default defineComponent({
  setup() {
    const state = reactive({
      datas: []
    })

    const getData = async () => {
      const res: any = await articleList()
      state.datas = res.body.data
      console.log('datas--', state.datas)
    }

    onMounted(() => {
      getData()
    })

    return { ...toRefs(state)}
  }
})
</script>

<style>

</style>
