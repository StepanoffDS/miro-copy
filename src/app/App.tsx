import { Outlet } from 'react-router-dom';

import { TemplatesModal } from '@/features/board-templates';

export const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Outlet />
      <TemplatesModal />
    </div>
  );
};
