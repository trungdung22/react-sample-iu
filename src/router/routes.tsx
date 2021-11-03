import { IS_CONNECT } from 'data/constants';
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
  {
    title: 'Whitepaper',
    path: '/whitepaper',
    LoadComponent: lazy(() => import('components/pages/whitepaper')),
    exact: true,
  },
  {
    title: 'Millipad',
    path: '/millipad',
    LoadComponent: lazy(() => import('components/pages/millipad')),
    exact: true,
  },
  {
    title: 'Millipad',
    path: '/millipad/:nameProject',
    LoadComponent: lazy(() => import('components/pages/millionsy')),
    exact: true,
  },
];

export default routes;
