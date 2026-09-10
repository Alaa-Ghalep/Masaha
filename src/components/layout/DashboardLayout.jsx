import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = ({ role }) => {
  // نحدد اسم الكلاس بناءً على الرول (theme-admin أو theme-user)
  const themeClass = `theme-${role}`;

  return (
    <div className={`flex min-h-screen ${themeClass} bg-[#F1F5F9] font-['Cairo']`}>
      {/* نمرر الرول للسايدبار ليجلب روابطه */}
      <Sidebar role={role} />
      
      <main className="flex-1 max-h-screen overflow-y-auto p-4 md:p-8">
        {/* هنا تظهر الصفحات الداخلية */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;