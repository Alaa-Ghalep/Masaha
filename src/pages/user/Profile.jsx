import { useState } from 'react';
import { RiEdit2Line, RiHeartFill, RiCopperCoinLine, RiTrophyLine, RiUserLine } from 'react-icons/ri';
import EditProfileModal from '../../components/modals/EditProfileModal';
import PageHeader from '../../components/layout/PageHeader';

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="البروفايل الشخصي" icon={<RiUserLine />} role="user" />

      {/* User Info Card */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden group">
        <button 
          onClick={() => setIsEditOpen(true)}
          className="absolute top-6 left-6 text-slate-300 hover:text-brand-500 transition-colors"
        >
          <RiEdit2Line size={22} />
        </button>

        <div className="w-32 h-32 bg-brand-500 rounded-[32px] flex items-center justify-center text-5xl text-white font-black shadow-xl group-hover:scale-105 transition-transform">أ</div>
        <div className="text-center md:text-right space-y-1">
            <h2 className="text-2xl font-black text-slate-800">أحمد محمد</h2>
            <p className="text-sm text-slate-400 font-bold">ahmed.m@example.com</p>
            <p className="text-xs text-slate-400 mt-2">عضو منذ يناير 2024</p>
        </div>
      </div>

      {/* Favorites List */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><RiHeartFill className="text-danger" /> المفضلة</h3>
          <div className="space-y-4">
              {['مساحة الإبداع', 'مساحة المستقبل'].map((item) => (
                  <div key={item} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-500/30 transition-all cursor-pointer">
                      <span className="font-bold text-slate-600 text-sm">{item}</span>
                      <div className="bg-brand-500 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs">‹</div>
                  </div>
              ))}
          </div>
      </div>

      {/* Gamification: Points & Rewards */}
      <div className="bg-gradient-to-br from-[#0D9488] to-[#0F766E] p-8 rounded-[40px] text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
          <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <h3 className="font-black text-xl flex items-center gap-2"><RiTrophyLine className="text-warning" /> النقاط والمكافآت</h3>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">المستوى الذهبي</p>
              </div>
              <div className="text-right">
                  <span className="text-4xl font-black">240</span>
                  <p className="text-[10px] font-bold">نقطة</p>
              </div>
          </div>

          <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[10px] font-bold">
                  <span>تحتاج 60 نقطة للوصول للمستوى الماسي 💎</span>
                  <span>80%</span>
              </div>
              <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/10">
                  <div className="bg-warning h-full w-[80%] rounded-full shadow-[0_0_15px_#FFB90066]"></div>
              </div>
          </div>
          <p className="text-[10px] text-center font-bold opacity-60 underline decoration-white/20">يحدث تلقائياً مع كل حجز ✓</p>
      </div>

      <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};

export default Profile;