import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Layout } from './pages/layout/layout';
import { NewProduct } from './pages/new-product/new-product';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'new-product',
        component: NewProduct,
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  }
];
