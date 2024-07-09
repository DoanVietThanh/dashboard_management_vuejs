const authGuard = (to, from, next) => {
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
};

export default authGuard;
