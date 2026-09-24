import React, { useState } from 'react';
import { RiTimeLine, RiArmchairLine, RiMoneyDollarCircleLine, RiEditLine, RiCloseCircleLine, RiCalendarCheckLine } from 'react-icons/ri';
import EditBookingModal from '../../components/modals/EditBookingModal';
import PageHeader from '../../components/layout/PageHeader';

const UserBookings = () => {
  const [filter, setFilter] = useState('الكل');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const STATUS_BY_FILTER = {
  'الكل': null,
  'حالية': 'حالية',
  'قادمة': 'قادمة',     
  'منتهية': 'منتهية',
};
  const bookings = [
    { id: 1, name: 'مساحة الإبداع',  date: '2024/12/10', time: '8 ساعات', seat: 'مقعد عادي', price: '120₪', status: 'حالية' },
    { id: 2, name: 'مساحة المستقبل', date: '2024/11/25', time: '3 ساعات', seat: 'مكتب خاص',  price: '60₪',  status: 'قادمة' },
    { id: 3, name: 'مساحة التطوير',  date: '2024/11/10', time: '1 ساعة',  seat: 'مقعد عادي', price: '20₪',  status: 'منتهية' },
  ];
const filteredBookings = bookings.filter((b) => {
  const targetStatus = STATUS_BY_FILTER[filter];
  return targetStatus === null || b.status === targetStatus;
});
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="حجوزاتي" icon={<RiCalendarCheckLine />} role="user" />

      <div className="flex justify-start">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['الكل', 'حالية', 'قادمة', 'منتهية'].map(f => (
            <button
              key={f} onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all mx-2 ${filter === f ? 'bg-[var(--primary)] text-white shadow-sm text-brand-600' : 'bg-white '}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredBookings.length === 0 ? (
  <p className="text-center text-sm text-slate-400 py-12">لا توجد حجوزات بهذه الحالة</p>
) : (
        filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{booking.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1">{booking.date}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${
                booking.status === 'حالية ' ? 'bg-emerald-50 text-emerald-500' : 
                booking.status === 'قادمة' ? 'bg-blue-50 text-blue-400' : 'bg-slate-50 text-slate-400'
              }`}>
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-4 border border-slate-50">
                <RiTimeLine className="text-brand-500 text-xl" />
                <div><p className="text-[10px] text-slate-400 font-bold">المدة</p><p className="text-sm font-bold">{booking.time}</p></div>
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-4 border border-slate-50">
                <RiArmchairLine className="text-brand-500 text-xl" />
                <div><p className="text-[10px] text-slate-400 font-bold">النوع</p><p className="text-sm font-bold">{booking.seat}</p></div>
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-4 border border-slate-50">
                <RiMoneyDollarCircleLine className="text-brand-500 text-xl" />
                <div><p className="text-[10px] text-slate-400 font-bold">السعر</p><p className="text-sm font-bold">{booking.price}</p></div>
              </div>
            </div>

          {(booking.status === 'حالية' || booking.status === 'قادمة') && (
              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setIsEditOpen(true)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <RiEditLine /> تعديل الحجز
                </button>
                <button className="flex-1 border border-red-100 text-red-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-all">
                  <RiCloseCircleLine /> إلغاء الحجز
                </button>
              </div>
            )}
          </div>
        ))
)}
      </div>
      <EditBookingModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};

export default UserBookings;