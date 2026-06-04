import { ROUTES } from '@/shared/model/routes';
import { Outlet, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  return (
    <div>
      {!isAuthPage && <div>Header</div>}
      <Outlet />
    </div>
  );
};
