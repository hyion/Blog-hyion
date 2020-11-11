<template>
  <div>
    <div class="content markdown-body">
      <div v-if="temp" v-html="temp.contentHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { article } from '/@/api/articles'

export default defineComponent({
  name: 'Detail',
  setup() {
    const state = reactive({
      temp: null
    })

    const route = useRoute()
    console.log(route.params)

    const getData = async () => {
      const res: any = await article(route.params.id)
      state.temp = res.body
      console.log('datas--', state.temp)
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

</style>
