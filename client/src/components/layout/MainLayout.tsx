import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-[60px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
