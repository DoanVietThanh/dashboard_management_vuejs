import { createWebHistory, createRouter } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';
import UserDashboard from '../views/UserDashboard.vue';
import ProductDashboard from '../views/ProductDashboard.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role') || '';
  const userRole = role === 'user';
  const adminRole = role === 'admin';
  const userAdminRole = role === 'userAdmin';
  const productAdminRole = role === 'productAdmin';

  if (adminRole) {
    next();
    return;
  }

  if (userRole) {
    alert('You are not authorized to access this page');
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresUserManagement) &&
    !userAdminRole
  ) {
    alert('You are not authorized to access this page');
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresProductManagement) &&
    !productAdminRole
  ) {
    alert('You are not authorized to access this page');
    return;
  }

  next();
});

export default router;
