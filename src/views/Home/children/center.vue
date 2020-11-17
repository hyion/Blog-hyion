<template>
  <div class="center-con f-flexjac">
    <div class="avatar-wrapper">
      <img class="avatar" v-if="userData" :src="userData.avatar" alt="avatar">
      <h1>Hyion</h1>
    </div>
    <!-- <div class="wrapper">
      <div class="slash"></div>
      <div class="sides">
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
      </div>
      <div class="text">
        <div class="text--backing">hurray</div>
        <div class="text--left">
          <div class="inner">hurray</div>
        </div>
        <div class="text--right">
          <div class="inner">hurray</div>
        </div>
      </div>
    </div> -->
    <div class="navgation">
      <ul class="f-flex align-center justify-center flex-wrap">
        <template v-for="item in navgationData" :key="item.path">
          <li class="navgation-item" @click="onRoute(item.path)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.name }}</span>
          </li>
        </template>
      </ul>
    </div>
    <div class="user">
      <div>
        <i class="el-icon-eleme email">:</i>
        <span>{{ userData.email }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../interface'

export default defineComponent({
  setup() {
    const state = reactive<IState>({
      navgationData: [
        { name:' 主页',icon:'menu', path:'/timeline' },
        { name:' 文章列表',icon:'tickets', path:'/articles' },
        { name:' 项目',icon:'picture', path:'/project' },
        { name:' 关于我',icon:'user', path:'/about' },
        { name:' 留言版',icon:'chat-round', path:'/message' },
        // { name:' Github',icon:'user', path:'https://github.com/qiheizhiya/myBlog' },
      ],
      userData: {
        avatar: '',
        email: '',
        cover: null
      }
    })
    const store = useStore()
    const router = useRouter()
    
    const onRoute = (path: string) => {
      router.push(path)
    }

    store.dispatch('getUserData').then(res => {
      console.log('getUserData--', res)
      state.userData = res
    })

    return { ...toRefs(state), onRoute }
  }
})
</script>

<style lang="scss" scoped>

.center-con {
  flex-direction: column;
  height: 100%;
  color: #fff;
  .wrapper {
    position: relative;
    letter-spacing: 0.12rem;
    padding-top: 0.33rem;
    padding-left: 0.25rem;
    padding-right: 0.18rem;
    padding-bottom: 0.1rem;
    color: #fff;
    font-size: 1.5rem;
    text-transform: uppercase;
    .slash {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(60deg) scaleY(0);
      transform-origin: center center;
      width: 0.075rem;
      // height: 145%;
      height: 100%;
      background: #fff;
      z-index: 4;
      box-shadow: 0 0 10px #27ae60;
      animation: slash 6s ease-in infinite;
    }
    .slash:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.37rem;
      height: 120%;
      background: #232323;
      z-index: -1;
    }
    .slash:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .sides {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      .side {
        position: absolute;
        background-color: #fff;
        &:nth-child(1) {
          top: 0;
          left: 0;
          width: 100%;
          height: 0.07rem;
          transform: translateX(-101%);
          animation: sideTop ease 6s infinite;
          box-shadow: 0 0 10px #ffd700;
        }
        &:nth-child(2) {
          top: 0;
          right: 0;
          width: 0.07rem;
          height: 100%;
          -webkit-transform: translateY(-101%);
          transform: translateY(-101%);
          animation: sideRight ease 6s infinite;
        }
        &:nth-child(3) {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0.07rem;
          transform: translateX(101%);
          animation: sideBottom ease 6s infinite;
        }
        &:nth-child(4) {
          top: 0;
          left: 0;
          width: 0.07rem;
          height: 100%;
          transform: translateY(101%);
          animation: sideLeft ease 6s infinite;
        }
      }
    }
    .text {
      position: relative;
      .text--backing {
        opacity: 0;
      }
      .text--left {
        position: absolute;
        top: 0;
        left: 0;
        width: 51%;
        height: 100%;
        overflow: hidden;
        .inner {
          transform: translateX(100%);
          animation: textLeft 6s ease-in-out infinite;
        }
      }
      .text--right {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        overflow: hidden;
        .inner {
          transform: translateX(-200%);
          animation: textRight 6s ease-in-out infinite;
        }
      }

    }
  }
  .navgation {
    margin: 0.4rem 0;
    white-space: nowrap;
    font-size: 16px;
    color: #fff;
    .navgation-item {
      margin: 10px 30px 0 0;
      font-size: 18px;
      font-weight: 500;
      transition: all 0.6s;
      cursor: pointer;
      &:hover {
        color: rgb(66, 245, 135);
        opacity: 0.8;
      }
    }
  }
  .avatar-wrapper {
    text-align: center;
    h1 {
      margin-top: 1px;
      color: #fff;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: all 0.9s;
      animation: scaleLogo infinite 3s;
    }
  }
  .user {
    .email {
      margin-right: 5px;
    }
  }
}

@keyframes slash {
  0% {
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  6% {
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  13% {
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  16.6% {
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
}

@keyframes sideRight {
  0%,
  14%,
  23% {
    // -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
  30%,
  62% {
    // -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  72% {
    // -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
  100% {
    // -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
}

@keyframes sideBottom {
  0%,
  14%,
  24%,
  28% {
    transform: translateX(101%);
  }
  37%,
  70% {
    transform: translateX(0);
  }
  79% {
    transform: translateX(-101%);
  }
  100% {
    transform: translateX(-101%);
  }
}

@keyframes sideLeft {
  0%,
  14%,
  24%,
  34%,
  35% {
    transform: translateY(101%);
  }
  44%,
  79% {
    transform: translateY(0);
  }
  86% {
    transform: translateY(-101%);
  }
  100% {
    transform: translateY(-101%);
  }
}

@keyframes sideTop {
  0%,
  14% {
    transform: translateX(-101%);
  }
  24%,
  55% {
    transform: translateX(0);
  }
  65% {
    transform: translateX(101%);
  }
  100% {
    transform: translateX(101%);
  }
}
@keyframes textLeft {
  0% {
    transform: translateX(100%);
  }
  10% {
    transform: translateX(0);
  }
  58% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(-200%);
  }
}

@keyframes textRight {
  0% {
    transform: translateX(-200%);
  }
  10% {
    transform: translateX(-100%);
  }
  58% {
    transform: translateX(-100%);
  }
  70% {
    transform: translateX(-300%);
  }
  100% {
    transform: translateX(-300%);
  }
}

@keyframes scaleLogo {
  0% {
    transform: rotate(0deg) scale(.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1);
    opacity: .8;
  }
  100% {
    transform: rotate(0deg) scale(.8);
    opacity: 1;
  }
}
</style>
