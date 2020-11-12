<template>
  <div class="detail">
    <hy-header />
    <div class="content markdown-body">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { article } from '/@/api/articles'
import marked from 'marked'

interface IState {
  temp: {
    content: string,
    title: string
  },
  content: string,
  
}

export default defineComponent({
  name: 'Detail',
  setup() {
    const state = reactive<IState>({
      temp: {
        content: '',
        title: ''
      },
      content: '',
    })

    const route = useRoute()
    console.log(route.params)

    const markdownRender = (data: any) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
      state.content = marked(data)
    }

    const getData = async () => {
      const res: any = await article(route.params.id)
      state.temp = res.body
      document.title = state.temp.title
      console.log('datas--', state.temp)
      markdownRender(state.temp.content)
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
.detail {
  width: 800px;
  margin: 0 auto;
  .content {
    padding-top: 100px;
    font-size: 14px;
  }
}
</style>
