import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  RiHome4Line, RiSearchLine, RiUserLine, 
  RiCalendarCheckLine, RiPriceTag3Line, 
  RiNotification3Line, RiBuilding2Line 
} from 'react-icons/ri';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'الرئيسية', path: '/dashboard', icon: <RiHome4Line />, exact: true },
    { name: 'استكشاف المساحات', path: '/dashboard/explore', icon: <RiSearchLine /> },
    { name: 'البروفايل', path: '/dashboard/profile', icon: <RiUserLine /> },
    { name: 'حجوزاتي', path: '/dashboard/bookings', icon: <RiCalendarCheckLine /> },
    { name: 'العروض والفعاليات', path: '/dashboard/offers', icon: <RiPriceTag3Line /> },
    { name: 'الإشعارات', path: '/dashboard/notifications', icon: <RiNotification3Line /> },
  ];

  return (
    <aside className="w-72 bg-[#0F172B] text-white flex flex-col hidden lg:flex sticky top-0 h-screen overflow-y-auto border-l border-white/5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
      <div className="bg-gradient-to-b from-[#009689] to-[#005F5A] p-6 pb-8 shadow-lg">
     
<div className="flex flex-col items-start gap-4 w-full">

    
    <div className="flex items-center gap-3 w-full">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10">
            <RiBuilding2Line size={24} />
        </div>

        <div className="text-left">
            <h2 className="text-white font-black text-xl leading-none">
                مساحة
            </h2>
            <span className="text-[10px] tracking-[4px] uppercase">
                نظام ادارة مشترك
            </span>
        </div>
    </div>

    {/* User */}
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center gap-3 w-full shadow-inner">
        <div className="w-10 h-10 bg-[#00D5BE] rounded-xl flex items-center justify-center text-white shrink-0">
            <RiUserLine size={20} />
        </div>

        <div className="text-right">
            <p className="text-sm font-black tracking-wide">
                المستخدم
            </p>
            <p className="text-[10px] opacity-70 font-bold">
                حساب نشط
            </p>
        </div>
    </div>

</div>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2 pb-10">
        {menuItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-4">            
              <span className={`text-2xl ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {item.icon}
              </span>              
                <span className="text-sm font-bold">{item.name}</span>
              </div>
           
               {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;