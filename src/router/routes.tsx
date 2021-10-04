import { lazy } from 'react';

type Routes = {
  title?: string,
  LoadComponent: React.ComponentType,
  exact: boolean,
  path: string,
}

const routes: Routes[] = [
  {
    title: 'Home',
    path: '/',
    LoadComponent: lazy(() => import('components/pages/home')),
    exact: true,
  },
  {
    title: 'Lottery',
    path: '/lottery',
    LoadComponent: lazy(() => import('components/pages/lottery')),
    exact: true,
  },
];

export default routes;
