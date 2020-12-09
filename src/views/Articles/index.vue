<template>
  <div class="articles-page">
    <hy-header />
    <section class="articles-container">
      <div class="year-list" v-for="(val, key, idx) in datas" :key="idx">
        <ul class="mon-list" v-for="(vals, keys, idxs) in val" :key="idxs">
          <li class="month">{{ enMon[Number(keys) - 1] }}, {{ key.slice(1, 5) }}</li>
          <ul class="day-list">
            <li v-for="(child_val, child_key, child_idx) in vals" :key="child_idx">
              <div class="item-l">
                <div class="img" @click="handleDetail(child_val.id)">
                  <img :src="child_val.image.url || '/image/other/default.jpg'" />
                </div>
                <div class="tit">
                  <span class="text" @click="handleDetail(child_val.id)">{{
                    child_val.title
                  }}</span>
                  <span>{{ child_val.like }} 喜欢 / {{ child_val.read }} 阅读</span>
                </div>
              </div>
              <span class="item-r">{{ child_val.time.day.en }}</span>
            </li>
          </ul>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { articleList } from '/@/api/articles'
import { useRouter } from 'vue-router'

interface IState {
  datas: any[]
  enMon: any[]
}
export default defineComponent({
  setup() {
    const state = reactive<IState>({
      datas: [],
      enMon: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    })

    const router = useRouter()

    const getData = async () => {
      const query = {
        from: 'list',
      }
      const res: any = await articleList()
      state.datas = res.body.data
      console.log('datas--', state.datas)
    }

    onMounted(() => {
      getData()
    })

    const handleDetail = (id: string) => {
      router.push(`/detail/${id}`)
    }

    return { ...toRefs(state), handleDetail }
  },
})
</script>

<style lang="scss" scoped>
.articles-page {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  height: 100%;
  min-height: 100vh;
  .articles-container {
    width: 90%;
    padding: 40px 0;
    margin: auto;
    .year-list {
      padding: 10px 20px;
    }
    .year {
      color: #333;
      font-size: 24px;
      font-weight: 400;
      margin: 10px 0 15px;
    }
    .mon-list {
      .month {
        color: #6e7ab5;
        font-weight: 400;
        font-size: 24px;
        margin: 30px 0 10px;
        list-style: none;
        position: relative;
        &:before {
          content: '';
          width: 16px;
          height: 16px;
          display: inline-block;
          background-color: #dce8ec;
          border: 3px solid #afcfff;
          margin-right: 22px;
          border-radius: 50%;
          box-sizing: border-box;
        }
        span {
          color: #999;
          font-size: 20px;
          font-style: oblique;
        }
      }
      .day-list {
        padding-left: 30px;
        border-left: 1px solid #f3fafd;
        margin-left: 6px;
        li {
          padding: 25px 0;
          border-bottom: 1px solid #f3fafd;
          display: flex;
          justify-content: space-between;
          .item-l {
            display: flex;
            .img {
              width: 60px;
              height: 60px;
              border-radius: 4px;
              margin-right: 15px;
              overflow: hidden;
              cursor: pointer;
              display: flex;
              justify-content: center;
              border: 1px solid #f3fafd;
              img {
                height: 100%;
              }
            }
            .tit {
              flex: 1;
              display: flex;
              flex-flow: column;
              justify-content: space-around;
              span:first-child {
                color: #5b6773;
                cursor: pointer;
                padding-bottom: 5px;
                &:hover,
                &:focus {
                  color: #024180;
                  background: radial-gradient(
                        circle at 10px -7px,
                        transparent 8px,
                        currentColor 8px,
                        currentColor 9px,
                        transparent 9px
                      )
                      repeat-x,
                    radial-gradient(
                        circle at 10px 27px,
                        transparent 8px,
                        currentColor 8px,
                        currentColor 9px,
                        transparent 9px
                      )
                      repeat-x;
                  background-size: 20px 20px;
                  background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
                  animation: waveFlow 1s infinite linear;
                }
                @keyframes waveFlow {
                  from {
                    background-position-x: -10px, 0;
                  }
                  to {
                    background-position-x: -30px, -20px;
                  }
                }
              }
              .text {
                font-size: 18px;
                font-weight: bold;
              }
              span:last-child {
                color: #a1a0d6;
                font-size: 13px;
                letter-spacing: 0;
              }
            }
          }
          .item-r {
            color: #d2c6a3;
            font-size: 13px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .articles-page {
    .articles-container {
      width: 95%;
      .year-list {
        padding: 10px;
        .day-list {
          padding-left: 10px;
          .text {
            font-size: 16px !important;
          }
        }
      }
      .mon-list {
        .month {
          margin: 10px;
        }
      }
    }
  }
}
</style>
