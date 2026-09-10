import {
  RiShieldUserLine,
  RiAccountCircleLine,
  RiUserStarLine,
  RiCustomerService2Line,
} from 'react-icons/ri';


const ROLE_GRADIENT = {
  user:         'from-[#009689] to-[#005F5A]',
  admin:        'from-[#9810FA] to-[#59168B]',
  owner:        'from-[#E17100] to-[#973C00]',
  receptionist: 'from-[#0084D1] to-[#00598A]',
};


const ROLE_ICON = {
  user:         <RiAccountCircleLine size={20} />,
  admin:        <RiShieldUserLine size={20} />,
  owner:        <RiUserStarLine size={20} />,
  receptionist: <RiCustomerService2Line size={20} />,
};


const PageHeader = ({ title, icon, role = 'user' }) => {
  const gradient = ROLE_GRADIENT[role] ?? ROLE_GRADIENT.user;
  const roleIcon = ROLE_ICON[role]     ?? ROLE_ICON.user;

  return (
    <header className="w-full bg-white shadow-lg rounded-2xl p-6 mb-8">
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">
          {icon && (
            <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shrink-0`}>
              {icon}
            </div>
          )}
          <h1 className="text-xl font-black text-slate-800">{title}</h1>
        </div>

        <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
          {roleIcon}
        </div>

      </div>
    </header>
  );
};

export default PageHeader;
