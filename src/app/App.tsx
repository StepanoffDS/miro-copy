import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Outlet />
    </div>
  );
};
