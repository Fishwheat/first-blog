import RoutesEnum from '@/enums/routes.enums';

const hobbyRoutes = {
  path: 'hobby',
  name: RoutesEnum.HOBBY,
  component: () => import('./pages/index.vue'),
  children: [],
  meta: {
    page: RoutesEnum.HOBBY,
  },
};

export default hobbyRoutes;
