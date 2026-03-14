import { Outlet } from 'react-router';
import Navbar from './components/layout/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
