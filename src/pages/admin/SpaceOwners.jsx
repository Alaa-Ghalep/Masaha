import React, { useState } from 'react';
import {
  RiUserAddLine,
  RiShieldUserLine,
  RiCalendarLine,
  RiEdit2Line,
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiBuildingLine,
} from 'react-icons/ri';
import PageHeader from '../../components/layout/PageHeader';

const initialAccounts = [
  {
    id: 1,
    name: 'محمد الغزاوي',
    email: 'm.ghazawi@spaces.ps',
    initial: 'م',
    avatarColor: 'bg-violet-600',
    status: 'نشط',
    remainingDays: 72,
    price: '٢٨,٥٠٠',
    dateRange: '٢٠٢٤/٣/١ – ٢٠٢٤/١٢/١',
    spaces: 2,
    expiredNotice: false,
  },
  {
    id: 2,
    name: 'سلمى النجار',
    email: 's.najar@spaces.ps',
    initial: 'س',
    avatarColor: 'bg-slate-400',
    status: 'منتهي الاشتراك',
    remainingDays: 0,
    price: '١٤,٢٠٠',
    dateRange: '٢٠٢٤/١/١٥ – ٢٠٢٤/٦/١٥',
    spaces: 1,
    expiredNotice: true,
  },
  {
    id: 3,
    name: 'كريم أبو صلاح',
    email: 'k.abusalah@spaces.ps',
    initial: 'ك',
    avatarColor: 'bg-indigo-700',
    status: 'معطل',
    remainingDays: 72,
    price: '٧,٨٠٠',
    dateRange: '٢٠٢٤/٢/١ – ٢٠٢٤/٩/١',
    spaces: 1,
    expiredNotice: false,
  },
];

const statusStyles = {
  'نشط': 'bg-emerald-50 text-emerald-500',
  'معطل': 'bg-red-50 text-red-400',
  'منتهي الاشتراك': 'bg-amber-50 text-amber-500',
};

const SpaceOwners = () => {
  const [accounts, setAccounts] = useState(initialAccounts);

  const toggleStatus = (id) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, status: acc.status === 'نشط' ? 'معطل' : 'نشط' } : acc
      )
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="حسابات أصحاب المساحات"
        icon={<RiUserAddLine />}
        role="admin"
        roleIcon={<RiShieldUserLine size={20} />}
      />

      <div className="relative bg-white rounded-[45px] border border-slate-100 p-10 shadow-sm space-y-8">
        <div className="flex items-center">
          <RiUserAddLine size={24} className="text-violet-600 me-4" />
        <h3 className="text-slate-800 font-black text-xl">حساب صاحب مساحة جديد</h3>

        </div>
      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">الاسم الكامل</label>
            <input type="text" placeholder="محمد الغزاوي" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">البريد الإلكتروني</label>
            <input type="email" placeholder="owner@masaha.ps" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">كلمة المرور</label>
            <input type="password" placeholder="أدخل كلمة المرور" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">اسم المساحة</label>
            <input type="text" placeholder="مساحة الإبداع" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
            <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">رقم الهاتف</label>
            <input type="tel" placeholder="059-000-0000" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">المنطقة</label>
            <select className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold outline-none">
              <option>غزة</option>
            </select>
          </div>
        
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">سرعة الإنترنت</label>
            <input type="text" placeholder="100 Mbps" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">إجمالي المقاعد</label>
            <input type="number" placeholder="40" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
        
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">الكهرباء</label>
            <input type="text" placeholder="24/7" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">السعر/ساعة (₪)</label>
            <input type="number" placeholder="15" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">الخدمات (مفصولة بفاصلة عربية ،)</label>
          <textarea rows="3" placeholder="قهوة مجانية، طباعة، قاعة اجتماعات" className="w-full bg-slate-50 border border-slate-50 rounded-3xl py-4 px-6 text-sm font-bold"></textarea>
        </div>

        {/* Subscription Duration */}
        <div className="bg-violet-50/40 border border-violet-100 rounded-[32px] p-6 space-y-4">
          <h3 className="text-violet-600 font-black text-xl flex items-center gap-2"><RiCalendarLine />مدة الاشتراك </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">تاريخ بداية الاشتراك</label>
              <input type="date" className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-widest">مدة الاشتراك</label>
              <select className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none">
                <option>3 أشهر</option>
                <option>1 شهر</option>
                <option>6 أشهر</option>
                <option>12 شهر</option>
              </select>
            </div>
          
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="bg-violet-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-violet-500/20 hover:bg-violet-700 transition-all">إنشاء الحساب</button>
          <button className="bg-white text-slate-500 px-8 py-3.5 rounded-2xl font-black border border-slate-100 hover:bg-slate-50 transition-all">إلغاء</button>
        </div>
      </div>

      <div className="space-y-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-4">
           
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 ${acc.avatarColor} rounded-2xl flex items-center justify-center text-white font-bold`}>
                  {acc.initial}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end flex-wrap">
                    <h3 className="font-black text-slate-800">{acc.name}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black ${statusStyles[acc.status]}`}>{acc.status}</span>
                    {acc.remainingDays > 0 && (
                      <span className="bg-teal-50 text-teal-600 px-3 py-0.5 rounded-full text-[10px] font-black">متبقي {acc.remainingDays} يوم</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-bold">{acc.email}</p>
                </div>
              </div>

                 <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(acc.id)}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    acc.status === 'نشط'
                      ? 'border-red-100 text-red-400 hover:bg-red-50'
                      : 'border-emerald-100 text-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  {acc.status === 'نشط' ? <RiCloseCircleLine size={18} /> : <RiCheckboxCircleLine size={18} />}
                </button>
                <button className="w-9 h-9 rounded-xl border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-violet-50 hover:text-violet-600 transition-all">
                  <RiEdit2Line size={16} />
                </button>
              </div>

            </div>

            <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 justify-end">
              <RiBuildingLine className="text-slate-300" /> مساحة {acc.spaces}
              <span className="text-slate-200">•</span>
              <RiCalendarLine className="text-slate-300" /> {acc.dateRange}
              <span className="text-slate-200">•</span>
              <span className="text-emerald-500 font-black">{acc.price}₪</span>
            </p>

            {acc.expiredNotice && (
              <p className="text-[11px] text-amber-500 font-bold flex items-center gap-1.5 justify-end bg-amber-50/50 rounded-xl px-3 py-2">
                <RiAlertLine /> تم إيقاف الحساب تلقائيًا بعد انتهاء الاشتراك
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceOwners;