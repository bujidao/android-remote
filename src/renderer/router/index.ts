import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const appRoutes = {
  path: '/',
  name: 'Layout',
  component: () => import(/* webpackChunkName: "SettingPage" */ '@/layouts/Index.vue'),
  redirect: '/devices',
  children: [
    {
      path: 'upload',
      component: () => import(/* webpackChunkName: "Upload" */ '@/pages/Upload.vue'),
      name: 'upload',
      meta: {
        hidden: true
      }
    },
    {
      path: 'qiniu',
      component: () => import(/* webpackChunkName: "Qiniu" */ '@/pages/picbeds/Qiniu.vue'),
      name: 'qiniu',
      meta: {
        hidden: true
      }
    },
    {
      path: 'tcyun',
      component: () => import(/* webpackChunkName: "TcYun" */ '@/pages/picbeds/TcYun.vue'),
      name: 'tcyun',
      meta: {
        hidden: true
      }
    },
    {
      path: 'upyun',
      component: () => import(/* webpackChunkName: "UpYun" */ '@/pages/picbeds/UpYun.vue'),
      name: 'upyun',
      meta: {
        hidden: true
      }
    },
    {
      path: 'github',
      component: () => import(/* webpackChunkName: "GitHub" */ '@/pages/picbeds/GitHub.vue'),
      name: 'github',
      meta: {
        hidden: true
      }
    },
    {
      path: 'smms',
      component: () => import(/* webpackChunkName: "SMMS" */ '@/pages/picbeds/SMMS.vue'),
      name: 'smms',
      meta: {
        hidden: true
      }
    },
    {
      path: 'aliyun',
      component: () => import(/* webpackChunkName: "AliYun" */ '@/pages/picbeds/AliYun.vue'),
      name: 'aliyun',
      meta: {
        hidden: true
      }
    },
    {
      path: 'imgur',
      component: () => import(/* webpackChunkName: "Imgur" */ '@/pages/picbeds/Imgur.vue'),
      name: 'imgur',
      meta: {
        hidden: true
      }
    },
    {
      path: 'others/:type',
      component: () => import(/* webpackChunkName: "Other" */ '@/pages/picbeds/Others.vue'),
      name: 'others',
      meta: {
        hidden: true
      }
    },
    {
      path: 'gallery',
      component: () => import(/* webpackChunkName: "Gallery" */ '@/pages/Gallery.vue'),
      name: 'gallery',
      meta: {
        keepAlive: true,
        hidden: true
      }
    },
    {
      path: '/devices',
      name: 'devices',
      component: () => import('@/pages/devices/list.vue'),
      meta: {
        icon: 'mobile-phone',
        title: '设备'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/pages/test/index.vue'),
      meta: {
        title: '测试'
      }
    },
    {
      path: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ '@/pages/PicGoSetting.vue'),
      name: 'setting',
      meta: {
        hidden: true
      }
    },
    {
      path: 'plugin',
      component: () => import(/* webpackChunkName: "Plugin" */ '@/pages/Plugin.vue'),
      name: 'plugin',
      meta: {
        hidden: true
      }
    },
    {
      path: 'shortKey',
      component: () => import(/* webpackChunkName: "ShortkeyPage" */ '@/pages/ShortKey.vue'),
      name: 'shortKey',
      meta: {
        hidden: true
      }
    }
  ]
}

export default new Router({
  mode: 'hash',
  routes: [
    appRoutes,
    {
      path: '/aa',
      name: 'tray-page',
      component: () => import(/* webpackChunkName: "tray" */ '@/pages/TrayPage.vue'),
      meta: {
        hidden: true
      }
    },
    {
      path: '/rename-page',
      name: 'rename-page',
      component: () => import(/* webpackChunkName: "RenamePage" */ '@/pages/RenamePage.vue'),
      meta: {
        hidden: true
      }
    },
    {
      path: '/mini-page',
      name: 'mini-page',
      component: () => import(/* webpackChunkName: "MiniPage" */ '@/pages/MiniPage.vue'),
      meta: {
        hidden: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
