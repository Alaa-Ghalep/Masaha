import { useState } from 'react';
import { RiUserLine, RiEdit2Line, RiHeartLine, RiTrophyLine } from 'react-icons/ri';
import PageHeader from '../../components/layout/PageHeader';
import EditProfileModal from '../../components/modals/EditProfileModal';

const INITIAL_USER = {
  name: 'أحمد محمد',
  email: 'ahmed.m@example.com',
  phone: '059-123-4567',
  memberSince: 'يناير 2024',
};

const FAVORITES = [
  { id: 1, name: 'مساحة الإبداع', city: 'غزة', pricePerHour: 15 },
  { id: 2, name: 'مساحة المستقبل', city: 'الوسطى', pricePerHour: 12 },
];

const CURRENT_POINTS = 240;
const CURRENT_LEVEL_NAME = 'الفضي';
const NEXT_LEVEL_NAME = 'الذهبي';
const NEXT_LEVEL_THRESHOLD = 300;

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [user, setUser] = useState(INITIAL_USER);

  const pointsNeeded = Math.max(NEXT_LEVEL_THRESHOLD - CURRENT_POINTS, 0);
  const progressPercent = Math.min((CURRENT_POINTS / NEXT_LEVEL_THRESHOLD) * 100, 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="البروفايل الشخصي" icon={<RiUserLine />} role="user" />

      {/* User Info Card */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-xl text-white font-black shadow-lg shadow-[var(--primary)]/20 shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="text-right space-y-1">
            <h2 className="text-base font-black text-slate-800">{user.name}</h2>
            <p className="text-xs text-slate-400 font-bold">{user.email}</p>
            <p className="text-xs text-slate-400 font-bold">{user.phone}</p>
            <p className="text-[11px] text-[var(--primary)] font-bold">عضو منذ {user.memberSince}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="text-slate-300 hover:text-[var(--primary)] transition-colors cursor-pointer shrink-0"
        >
          <RiEdit2Line size={20} />
        </button>
      </div>

      {/* Favorites List */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-800 flex items-center justify-start gap-2">
         <RiHeartLine className="text-red-500" size={22} /> المفضلة 
        </h3>

        <div className="space-y-4">
          {FAVORITES.map((space) => (
            <div
              key={space.id}
              className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[var(--primary)]/30 transition-all"
            >
              <div className="text-right">
                <p className="font-bold text-slate-600 text-sm">{space.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {space.city} • {space.pricePerHour}₪/ساعة
                </p>
              </div>

              <button className="bg-[var(--primary)] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition cursor-pointer shrink-0">
                احجز
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gamification: Points & Rewards */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-slate-900 p-8 rounded-[40px] text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-10 -translate-y-10" />

        <div className="relative z-10 text-right">
          <h3 className="font-black text-lg flex items-center justify-start gap-2">
          <RiTrophyLine className="text-[#FFB900]" />  النقاط والمكافآت 
          </h3>

          <div className="flex items-baseline justify-start gap-2 mt-1">
            <span className="text-4xl font-black">{CURRENT_POINTS}</span>
            <span className="text-sm font-bold opacity-80">نقطة</span>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-start gap-1 text-[10px] font-bold">
            <span>
              تحتاج {pointsNeeded} نقطة للوصول للمستوى {NEXT_LEVEL_NAME}
            </span>
            <span>⭐</span>
          </div>

          <div dir="ltr" className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-[#FFB900] h-full rounded-full shadow-[0_0_15px_#FFB90066]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold opacity-70">
            <span>{CURRENT_LEVEL_NAME}</span>
            <span>
              {NEXT_LEVEL_NAME} ({NEXT_LEVEL_THRESHOLD})
            </span>
          </div>
        </div>

        <p className="text-[10px] text-center font-bold opacity-60 underline decoration-white/20 relative z-10">
          يحدث تلقائياً مع كل حجز ✓
        </p>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        onSave={(updatedUser) => setUser(updatedUser)}
      />
    </div>
  );
};

export default Profile;