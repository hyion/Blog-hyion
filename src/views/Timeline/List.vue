<template>
  <section class="content-wrap">
    <div class="article f-flex align-center fadeInUp"
      v-for="item in datas"
      :class="`wow${item.id}`"
      :key="item.id">
      <div class="img-outer f-flex align-center justify-center" @click="toDetail(item.id)">
        <img v-if="item.image" :src="item.image.url" :alt="item.image.name" />
      </div>
      <div class="text-outer">
        <div class="info">
          <div class="time" v-if="item.time">{{ item.time.month.cn }}月, {{ item.time.day.on }}, {{ item.time.year }}</div>
          <div class="title" @click="toDetail(item.id)">
            <a>{{ item.title }}</a>
          </div>
          <div class="description">{{ item.describe }}</div>
          <div class="handle f-flex align-center">
            <div class="handle-thunk f-flex align-center">
              <i class="el-icon-view"></i>
              <span>{{ item.read }}</span>
            </div>
            <div class="handle-thunk f-flex align-center">
              <i class="el-icon-star-on"></i>
              <span>{{ item.like }}</span>
            </div>
            <div class="handle-thunk f-flex align-center">
              <i class="el-icon-collection-tag"></i>
              <span>{{ item.words }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { articleList } from '/@/api/articles'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      datas: []
    })

    const getData = async () => {
      const res = await articleList()
      state.datas = res.body.data
      console.log('datas--', state.datas)
    }

    onMounted(() => {
      getData()
    })

    const toDetail = () => {
      console.log('de')
    }

    return {
      ...toRefs(state),
      toDetail
    }
  }
}
</script>

<style lang="scss">
.content-wrap {
  position: relative;
  width: 1100px;
  margin: 0 auto;
  padding: 100px 0;
  &::after {
    content: "";
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    position: absolute;
    background: #eaeaea;
    z-index: 0;
    width: 1px;
    height: 97%;
  }
}
.article {
  position: relative;
  z-index: 2;
  &:not(:first-of-type) {
    margin-top: 100px;
  }
  &:nth-of-type(odd) {
    flex-direction: row-reverse;
  }
  .img-outer {
    width: 680px;
    height: 440px;
    font-size: 0;
    position: relative;
    cursor: pointer;
    z-index: 3;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid #f3fafd;
    transition: all 0.3s;
    flex: 0 0 auto;
    img {
      flex: 0 0 auto;
      width: 100%;
      height: 100%;
    }
  }
  .text-outer {
    padding: 80px 100px 0 80px;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    height: 400px;
    width: 500px;
    .info {
      .time {
        color: #999;
        font-size: 12px;
      }
      .title {
        margin: 8px 0 2px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: 500;
        a {
          font-size: 24px;
          line-height: 30px;
          cursor: pointer;
          color: #333;
          &:hover,
            &:focus {
              color: #26a69a;
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
              background-position: -10px calc(100% + 16px),
                0 calc(100% - 4px);
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
      }
      .description {
        color: #666;
        font-size: 14px;
        line-height: 22px;
        margin-top: 10px;
        // .text-overflow(3);
      }
      .handle {
        margin-top: 60px;
        font-size: 12px;
        color: #999;
        .handle-thunk {
          position: relative;
          &::after,
          &::before {
            opacity: 0;
            visibility: visible;
          }
          &::after {
            content: "浏览数";
            transform: translate(-50%, -5px);
            background: #ef6d57;
            white-space: nowrap;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            padding: 5px 14px;
            position: absolute;
            bottom: 100%;
            left: 50%;
            transition: all 0.3s;
          }
          &::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transition: all 0.3s;
            border: 5px solid transparent;
            border-top-color: #ef6d57;
            transform: translate(-50%, 5px);
          }
          &:hover {
            &::after,
            &::before {
              opacity: 1;
              visibility: visible;
            }
          }
          &:nth-of-type(1):hover {
            color: #ef6d57;
          }
          &:nth-of-type(2) {
            &::after {
              content: "喜欢人数";
            }
          }
          &:nth-of-type(3) {
            i {
              font-size: 16px;
              margin-right: 2px;
            }
            &::after {
              content: "字数";
            }
          }
          &:nth-of-type(2):hover {
            color: #50bcb6;
            &::after {
              background-color: #50bcb6;
            }
            &::before {
              border-top-color: #50bcb6;
            }
          }
          &:nth-of-type(3):hover {
            color: #ffa800;
            &::after {
              background-color: #ffa800;
            }
            &::before {
              border-top-color: #ffa800;
            }
          }
          margin-right: 20px;
          i {
            font-size: 19px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .content-wrap {
    width: 900px;
    .article {
      .img-outer {
        width: 480px;
        height: 310px;
      }
      .text-outer {
        width: 420px;
        height: 290px;
        padding: 50px 60px 0;
        .info {
          .handle {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .content-wrap {
    width: 100%;
    .article {
      flex-direction: column !important;
      border-bottom: 1px solid #eaeaea;
      .img-outer {
        width: 100%;
        height: auto;
        img {
          width: 680px;
          max-width: 100%;
        }
      }
      .text-outer {
        width: 96%;
        padding: 20px 20px;
        margin: auto;
        border: none;
        background: #fff;
        height: auto;
        .info {
          .handle {
            margin-top: 30px;
          }
          // .description {
          // }
        }
      }
    }
  }
}
</style>
