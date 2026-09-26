import { RiHome4Line, RiSearchLine, RiUserLine,
  RiBuildingLine, RiBarChartBoxLine, RiNotification3Line,
  RiCalendarCheckLine, RiPriceTag3Line,
  RiSettings3Line, RiTeamLine, RiFileListLine,
  RiUserStarLine,
  RiCalendarEventLine,
  RiAlertLine,
  
} from 'react-icons/ri';

export const MENU_LINKS = {
  user: [
    { name: 'الرئيسية',           path: '/dashboard',              icon: <RiHome4Line />,         exact: true },
    { name: 'استكشاف المساحات',  path: '/dashboard/explore',      icon: <RiSearchLine /> },
    { name: 'حجوزاتي',           path: '/dashboard/bookings',     icon: <RiCalendarCheckLine /> },
    { name: 'العروض والفعاليات', path: '/dashboard/offers',       icon: <RiPriceTag3Line /> },
    { name: 'الإشعارات',         path: '/dashboard/notifications',icon: <RiNotification3Line /> },
    { name: 'البروفايل',         path: '/dashboard/profile',      icon: <RiUserLine /> },
  ],

  admin: [
    { name: 'الرئيسية',          path: '/admin/dashboard',     icon: <RiHome4Line />,       exact: true },
    { name: 'إدارة المستخدمين', path: '/admin/users',         icon: <RiTeamLine /> },
    { name: 'إدارة المساحات',   path: '/admin/spaces',        icon: <RiBuildingLine /> },
    { name: 'أصحاب المساحات',   path: '/admin/spaceowners',   icon: <RiUserStarLine /> },
    { name: 'التقارير',         path: '/admin/reports',       icon: <RiBarChartBoxLine /> },
    { name: 'الإشعارات',        path: '/admin/notifications', icon: <RiNotification3Line /> },
  ],

  owner: [
    { name: 'الرئيسية',         path: '/owner/dashboard',        icon: <RiHome4Line />,    exact: true },
    { name: 'الفعاليات',          path: '/owner/events',           icon: <RiCalendarEventLine /> },
    { name: 'العروض',         path: '/owner/offers',         icon: <RiPriceTag3Line /> },
    { name: 'التقارير',         path: '/owner/reports',          icon: <RiBarChartBoxLine /> },
    { name: 'الطوارئ',        path: '/owner/emergency',    icon: <RiAlertLine /> },
    { name: 'ادارة الموظفين',        path: '/owner/staff',         icon: <RiTeamLine /> },
  ],

  receptionist: [
    { name: 'الرئيسية',         path: '/receptionist/dashboard',         icon: <RiHome4Line />,         exact: true },
    { name: 'تسجيل الوصول',         path: '/receptionist/Chechin',         icon: <RiHome4Line />,         },
    { name: 'تفاصيل الحجوزات',         path: '/receptionist/bookings',          icon: <RiCalendarCheckLine /> },
    { name: ' اشعارات الدفع',         path: '/receptionist/paymentnotifications',          icon: <RiCalendarCheckLine /> },
    { name: '  الاحصائيات',         path: '/receptionist/statisticspage',          icon: <RiCalendarCheckLine /> },
    { name: 'الإشعارات',        path: '/receptionist/notificationspage',    icon: <RiNotification3Line /> },
  ],
};