import RoutesEnum from '@/enums/routes.enums';

const blogAboutRoutes = {
  path: 'blog-about',
  name: RoutesEnum.BLOGABOUT,
  component: () => import('./pages/index.vue'),
  children: [],
  meta: {
    page: RoutesEnum.BLOGABOUT,
  },
};

export default blogAboutRoutes;
