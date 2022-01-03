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
    title: 'MILLIGO',
    path: '/milligo',
    LoadComponent: lazy(() => import('components/pages/MILLIGO')),
    exact: true,
  },
  {
    title: 'Millionsy',
    path: '/MILLIGO/:nameProject',
    LoadComponent: lazy(() => import('components/pages/millionsy')),
    exact: true,
  },
  {
    title: 'NFT',
    path: '/nft-ticket',
    LoadComponent: lazy(() => import('components/pages/nft')),
    exact: true,
  },
];

export default routes;
