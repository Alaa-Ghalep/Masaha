// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { 
//   RiHome4Line, RiSearchLine, RiUserLine, 
//   RiCalendarCheckLine, RiPriceTag3Line, 
//   RiNotification3Line, RiBuilding2Line 
// } from 'react-icons/ri';

// const Sidebar = () => {
//   const location = useLocation();

//   const menuItems = [
//     { name: 'الرئيسية', path: '/dashboard', icon: <RiHome4Line />, exact: true },
//     { name: 'استكشاف المساحات', path: '/dashboard/explore', icon: <RiSearchLine /> },
//     { name: 'البروفايل', path: '/dashboard/profile', icon: <RiUserLine /> },
//     { name: 'حجوزاتي', path: '/dashboard/bookings', icon: <RiCalendarCheckLine /> },
//     { name: 'العروض والفعاليات', path: '/dashboard/offers', icon: <RiPriceTag3Line /> },
//     { name: 'الإشعارات', path: '/dashboard/notifications', icon: <RiNotification3Line /> },
//   ];

//   return (
//     <aside className="w-72 bg-[#0F172B] text-white flex flex-col hidden lg:flex sticky top-0 h-screen overflow-y-auto border-l border-white/5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
//       <div className="bg-gradient-to-b from-[#009689] to-[#005F5A] p-6 pb-8 shadow-lg">
     
// <div className="flex flex-col items-start gap-4 w-full">

    
//     <div className="flex items-center gap-3 w-full">
//         <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10">
//             <RiBuilding2Line size={24} />
//         </div>

//         <div className="text-left">
//             <h2 className="text-white font-black text-xl leading-none">
//                 مساحة
//             </h2>
//             <span className="text-[10px] tracking-[4px] uppercase">
//                 نظام ادارة مشترك
//             </span>
//         </div>
//     </div>

//     {/* User */}
//     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center gap-3 w-full shadow-inner">
//         <div className="w-10 h-10 bg-[#00D5BE] rounded-xl flex items-center justify-center text-white shrink-0">
//             <RiUserLine size={20} />
//         </div>

//         <div className="text-right">
//             <p className="text-sm font-black tracking-wide">
//                 المستخدم
//             </p>
//             <p className="text-[10px] opacity-70 font-bold">
//                 حساب نشط
//             </p>
//         </div>
//     </div>

// </div>
//       </div>

//       <nav className="flex-1 px-4 mt-8 space-y-2 pb-10">
//         {menuItems.map((item) => {
//           const isActive = item.exact 
//             ? location.pathname === item.path 
//             : location.pathname.startsWith(item.path);

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={`
//                 group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
//                 ${isActive 
//                   ? 'bg-white/10 text-white shadow-sm' 
//                   : 'text-slate-400 hover:bg-white/5 hover:text-white'}
//               `}
//             >
//               <div className="flex items-center gap-4">            
//               <span className={`text-2xl ${isActive ? 'text-white' : 'text-slate-500'}`}>
//                 {item.icon}
//               </span>              
//                 <span className="text-sm font-bold">{item.name}</span>
//               </div>
           
//                {isActive && (
//                   <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
//                 )}
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



import { NavLink } from 'react-router-dom';
import { MENU_LINKS } from '../../constants/menuLinks';
import {
  RiUserLine,
  RiBuilding2Line,
  RiShieldUserLine,
  RiCustomerService2Line,
  RiAccountCircleLine,
  RiUserStarLine,
} from 'react-icons/ri';

const ROLE_STYLES = {
  user:         'from-[#009689] to-[#005F5A]', 
  admin:        'from-[#9810FA] to-[#59168B]', 
  owner:        'from-[#E17100] to-[#973C00]', 
  receptionist: 'from-[#0084D1] to-[#00598A]', 
};

const ROLE_LABELS = {
  user:         'نظام إدارة مشارك',
  admin:        'لوحة تحكم الإدارة',
  owner:        'لوحة المالك',
  receptionist: 'لوحة الاستقبال',
};

const ROLE_NAMES = {
  user:         'المستخدم',
  admin:        'الأدمن العام',
  owner:        'المالك',
  receptionist: 'موظف الاستقبال',
};


const ROLE_ICONS = {
  user:         <RiAccountCircleLine size={24} />,
  admin:        <RiShieldUserLine size={24} />,
  owner:        <RiUserStarLine size={24} />,
  receptionist: <RiCustomerService2Line size={24} />,
};

const Sidebar = ({ role }) => {
  const links    = MENU_LINKS[role] ?? [];
  const gradient = ROLE_STYLES[role] ?? ROLE_STYLES.user;
  const label    = ROLE_LABELS[role] ?? '';
  const userName = ROLE_NAMES[role]  ?? 'مستخدم';
  const roleIcon = ROLE_ICONS[role]  ?? ROLE_ICONS.user;

  return (
    <aside className="w-72 bg-[#0F172B] text-white flex flex-col hidden lg:flex sticky top-0 h-screen overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* الهيدر — لونه يتغير حسب الدور */}
      <div className={`bg-gradient-to-b ${gradient}  pb-8 shadow-lg transition-all duration-500 p-6`}>
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10 me-4">
              <RiBuilding2Line size={24} />
          </div>
           <div>

        
        <h2 className="font-black text-[15px] leading-tight">مساحة</h2>
        <p className="text-[13px] opacity-50 uppercase mt-1">{label}</p>
</div>
        </div>
       
        {/* بطاقة المستخدم */}
        <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-3xl flex items-center">
           <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center me-4">
           {roleIcon}
          </div>
          <div className="text-right">
            <p className="text-[15px] font-black">{userName}</p>
            <p className="text-[13px] opacity-50">حساب نشط</p>
          </div>
       
        </div>
      </div>

      {/* القائمة */}
      <nav className="flex-1 px-4 mt-8 space-y-2 pb-10">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `
              group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
              ${isActive
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;