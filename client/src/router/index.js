import { createWebHistory, createRouter } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';
import UserDashboard from '../views/UserDashboard.vue';
import ProductDashboard from '../views/ProductDashboard.vue';
import Unauthorization from '../views/Unauthorization.vue';
import authGuard from './authGuard';

const routes = [
  { path: '/', name: 'signin', component: SignIn },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'manage-users',
        name: 'dashboard/manage-users',
        component: UserDashboard,
        meta: { requiresUserManagement: true },
      },
      {
        path: 'manage-products',
        name: 'dashboard/manage-products',
        component: ProductDashboard,
        meta: { requiresProductManagement: true },
      },
    ],
  },
  { path: '/unauthorized', name: 'unauthorized', component: Unauthorization },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
