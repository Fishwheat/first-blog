import RoutesEnum from '@/enums/routes.enums';

const friendlyLinkRoutes = {
  path: 'friendly-link',
  name: RoutesEnum.FRIENDLYLINK,
  component: () => import('./pages/index.vue'),
  children: [],
  meta: {
    page: RoutesEnum.FRIENDLYLINK,
  },
};

export default friendlyLinkRoutes;
