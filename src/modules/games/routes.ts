import RoutesEnum from '@/enums/routes.enums';

const gamesRoutes = {
  path: 'games',
  name: RoutesEnum.GAMES,
  component: () => import('./pages/index.vue'),
  children: [],
  meta: {
    page: RoutesEnum.GAMES,
  },
};

export default gamesRoutes;
