import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue';
import RoutesEnum from '@/enums/routes.enums';
import Main from '@/modules/main/index.vue';
import homeRoutes from '@/modules/home/routes';
import hobbyRoutes from '@/modules/hobby/routes';
import gamesRoutes from '@/modules/games/routes';
import blogAboutRoutes from '@/modules/blog-about/routes';
import friendlyLinkRoutes from '@/modules/friendly-link/routes';
import personalRoutes from '@/modules/personal/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RoutesEnum.MAIN,
    component: Main,
    children: [
      homeRoutes,
      hobbyRoutes,
      gamesRoutes,
      blogAboutRoutes,
      friendlyLinkRoutes,
      personalRoutes,
    ],
  },
  // {
  //   path: '/',
  //   name: RoutesEnum.HOME,
  //   // component: Home,
  //   component: () => import('@/modules/Home/index.vue'),
  //   // redirect: {
  //   //   name: RoutesEnum.HOME,
  //   // },
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    try {
      next({
        name: RoutesEnum.HOME,
      });
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

export default router;
