import { RiHome4Line, RiSearchLine, RiUserLine,
  RiBuildingLine, RiBarChartBoxLine, RiNotification3Line,
  RiCalendarCheckLine, RiPriceTag3Line,
  RiSettings3Line, RiTeamLine, RiFileListLine,
  RiUserStarLine,
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
    { name: 'مساحاتي',          path: '/owner/spaces',           icon: <RiBuildingLine /> },
    { name: 'الحجوزات',         path: '/owner/bookings',         icon: <RiCalendarCheckLine /> },
    { name: 'التقارير',         path: '/owner/reports',          icon: <RiBarChartBoxLine /> },
    { name: 'الإشعارات',        path: '/owner/notifications',    icon: <RiNotification3Line /> },
    { name: 'الإعدادات',        path: '/owner/settings',         icon: <RiSettings3Line /> },
  ],

  receptionist: [
    { name: 'الرئيسية',         path: '/receptionist/dashboard',         icon: <RiHome4Line />,         exact: true },
    { name: 'الحجوزات',         path: '/receptionist/bookings',          icon: <RiCalendarCheckLine /> },
    { name: 'قائمة الزوار',     path: '/receptionist/visitors',         icon: <RiTeamLine /> },
    { name: 'الطلبات',          path: '/receptionist/requests',         icon: <RiFileListLine /> },
    { name: 'الإشعارات',        path: '/receptionist/notifications',    icon: <RiNotification3Line /> },
  ],
};