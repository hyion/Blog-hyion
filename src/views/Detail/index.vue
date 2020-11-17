<template>
  <div class="detail">
    <hy-header :title="temp.title" @like="onLike" :isLike="isLike" />
    <section class="header-con f-flex justify-start flex-column">
      
      <div class="sub-title f-flex justify-start">
        <span v-if="temp.time">{{ temp.time.month.cn }}月 {{ temp.time.day.on }}, {{ temp.time.year }}</span>
        <span>阅读：{{temp.read}}</span>
        <span>字数：{{temp.words}}</span>
        <!-- <span>评论：{{commentList.total}}</span> -->
        <span>喜欢: {{temp.like}}</span>
      </div>
      <h1 class="bold">{{ temp.title }}</h1>
    </section>
    <div class="content markdown-body">
      <div v-html="content"></div>
    </div>
    <!-- <a-back-top title="返回顶部"></a-back-top> -->
    <hy-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { article, articleLike } from '/@/api/articles'
import marked from 'marked'
import { message } from 'ant-design-vue';
import { setStore, getStore } from '/@/utils/store'

interface IState {
  temp: {
    content: string,
    title: string,
    _id: string,
    like: number
  },
  content: string,
  isLike: boolean
}

export default defineComponent({
  name: 'Detail',
  setup() {
    const state = reactive<IState>({
      temp: {
        content: '',
        title: '',
        _id: '',
        like: 0
      },
      content: '',
      isLike: false
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

      const like = getStore(`like-${state.temp._id}`);
      state.isLike = Boolean(like)
      console.log('state--', state)
    }

    onMounted(() => {
      getData()
    })

    const onLike = async (e: any) => {
      console.log(e)
      if (!e) {
        const res: any = await articleLike(state.temp._id)
        console.log('liked--', res)
        state.temp.like++
        setStore(`like-${state.temp._id}`, true)
        state.isLike = true
        message.success('已收到你的喜欢, 谢谢啦~')
      } else {
        message.info('本文你已经喜欢过啦~')
      }
    }

    return {
      ...toRefs(state),
      onLike
    }
  }
})
</script>

<style lang="scss" scoped>
$border-1px: 1px solid rgba(7, 17, 27, 0.1);

.detail {
  width: 800px;
  margin: 0 auto;
  padding-top: 80px;
  .header-con {
    width: 100%;
    // border-bottom: $border-1px;
    h1 {
      padding: 10px 0 30px;
      font-size: 30px;
      color: var(--colorTitle);
    }
    .sub-title {
      width: 100%;
      // padding-bottom: 10px;
      font-size: 14px;
      color: var(--colorLightGray);
      span {
        margin-right: 10px;
      }
    }
  }
  .content {
    padding-top: 20px;
    font-size: 14px;
  }
}
</style>
