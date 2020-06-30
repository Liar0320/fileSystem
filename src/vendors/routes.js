import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/login.vue'),
      // redirect: '/app/home',
      children: [],
    },
    {
      path: '/fileChose',
      name: 'fileChose',
      component: () => import('pages/fileChose.vue'),
      // redirect: '/app/home',
      // children: [],
    },
    {
      path: '/fileList/:path',
      name: 'fileList',
      component: () => import('pages/fileList.vue'),
      // redirect: '/app/home',
      children: [],
    },
    {
      path: '/paper',
      name: 'paper',
      component: () => import('pages/paper.vue'),
      // redirect: '/app/home',
      children: [],
    },
    {
      path: '*',
      redirect: 'login',
    },
  ],
});

// 全局守卫
/* eslint-disable */
router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.accessToken ? true : false; // 获取token
  // const LoginFlag = localStorage.isLogin == 'true' ? true : false;  // 获取登录状态

  if (to.path == '/login') {
    next();
  } else {
    // if (isLogin && LoginFlag) {
    //   iView.LoadingBar.start();
    //   next();
    //   return true;
    // }
    if (localStorage.getItem('pwd') === '159753') {
      // iView.LoadingBar.start();
      next();
      return true;
    }
    router.push('login');
  }
  next();
  window.scrollTo(0, 0);
});

router.afterEach(route => {
  // iView.LoadingBar.finish();
});

export default router;
