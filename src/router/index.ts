// import { h } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import store from '../store'
let _hmt: any = []

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: import('../views/Home/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About/index.vue'),
    meta: { title: 'hurray' }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('/@/views/Timeline/index.vue'),
    meta: { title: 'Hurray' }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('/@/views/Articles/index.vue'),
    meta: { title: '文章列表  | Hurray' }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit('setShowPageLoadScrollBar', true)
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview', to.fullPath])
    }
  }
  const { meta } = to
  if (meta) {
    for (let name in meta) {
      document.title = meta[name] ? meta[name] : 'Hurray'
    }
  } else {
    document.title = 'Hurray'
  }
  next()
})
router.afterEach((to, from) => {
  setTimeout(() => {
    store.commit('setShowPageLoadScrollBar', false)
  }, 1000)
})

export default router;

