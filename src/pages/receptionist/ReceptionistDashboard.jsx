import { useState } from 'react';
import {
  RiCustomerService2Line,
  RiCalendarCheckLine,
  RiTimeLine,
  RiLogoutBoxRLine,
  RiUserAddLine,
  RiAddLine,
  RiSubtractLine,
  RiCheckboxCircleLine,
  RiGroupLine,
} from 'react-icons/ri';
import PageHeader from '../../components/layout/PageHeader';

const SPACE_CAPACITY = 30; 
const MAX_SESSION_HOURS = 8;

const INITIAL_ATTENDEES = [
  { id: 1, name: 'يوسف أحمد', seat: 'A-01', hours: 3, checkInTime: '٨:٣٠' },
  { id: 2, name: 'سارة حسن', seat: 'A-03', hours: 2, checkInTime: '٩:٠٠' },
  { id: 3, name: 'خالد محمود', seat: 'A-06', hours: 1, checkInTime: '١٠:٠٠' },
  { id: 4, name: 'أميرة عبدالله', seat: 'B-01', hours: 4, checkInTime: '٨:٠٠' },
  { id: 5, name: 'طارق حمدان', seat: 'B-03', hours: 2, checkInTime: '٩:٣٠' },
  { id: 6, name: 'ليلى سمير', seat: 'C-02', hours: 3, checkInTime: '٨:٤٥' },
];

const hoursLabel = (h) =>
  h === 1 ? 'ساعة' : h === 2 ? 'ساعتان' : h <= 10 ? 'ساعات' : 'ساعة';

function OccupancyCard({ occupied, capacity }) {
  const RADIUS = 42;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const percentage = Math.min(Math.round((occupied / capacity) * 100), 100);
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  const available = Math.max(capacity - occupied, 0);

  return (
 <div dir="rtl" className="bg-gradient-to-br from-[var(--receptionist-primary)] to-[var(--receptionist-secondary)] rounded-3xl p-6 shadow flex flex-row items-center justify-start gap-6">
  
  <div className="relative w-40 h-40 shrink-0">
    <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
      <circle cx={50} cy={50} r={RADIUS} fill="none" stroke="white" strokeWidth={13} />
    
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
      {percentage}%
    </div>
  </div>

  <div className="flex flex-col text-white text-right">
    <span className="text-xl opacity-90">الإشغال الحالي</span>
    
    <div className="flex flex-row items-baseline gap-1 mt-1">
      <span className="text-xl opacity-70 leading-none">{capacity}/</span>
      <span className="text-4xl font-bold leading-none">{occupied}</span>
    </div>
    
    <span className="text-md opacity-80 mt-1">مقعد مشغول</span>

    <div className="flex flex-row items-center gap-4 mt-4 text-md opacity-90">
      <span className="flex flex-row items-center gap-1">
        {occupied} مشغول <RiGroupLine size={14} /> 
      </span>
      <span className="flex flex-row items-center gap-1">
        {available} متاح    <RiCheckboxCircleLine size={14} /> 
      </span>
    </div>
  </div>

</div>
  );
}
// الحاضرين
function AttendeeRow({ index, attendee, onCheckOut }) {
  const progress = Math.min((attendee.hours / MAX_SESSION_HOURS) * 100, 100);

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-50 last:border-b-0">
      <div className="shrink-0 w-8 h-8 rounded-full bg-slate-300 text-[var(--receptionist-primary)] text-md font-semibold flex items-center justify-center">
        {index + 1}
      </div>
    

      <div className="flex-1 min-w-0 text-right">
        <p className=" font-semibold text-slate-800 truncate">{attendee.name}</p>
        <div className="flex items-center justify-end gap-2 text-xs text-slate-400 mt-1 flex-wrap">
          <span>{attendee.seat}</span>
          <span className="flex items-center gap-1">
            {attendee.hours} {hoursLabel(attendee.hours)} <RiTimeLine size={12} />
          </span>
          <span>دخل {attendee.checkInTime}</span>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-1 shrink-0 w-14">
        <span className="text-[11px] text-slate-400">{attendee.hours}س</span>
        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--receptionist-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    
      <button
        onClick={() => onCheckOut(attendee.id)}
        className="shrink-0 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl px-4 py-2 transition"
      >
        تسجيل خروج
      </button>
    </div>
  );
}

function AttendeesList({ attendees, onCheckOut }) {
  return (
    <div className="bg-white shadow rounded-3xl p-6 glass-effect">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 text-xl">
       <RiGroupLine className="text-[var(--receptionist-primary)]" />    الحاضرون الآن 
        </h2>
        <span className="text-md font-semibold bg-green-50 text-green-600 border border-green-600 rounded-full px-3 py-1">
          {attendees.length} أشخاص
        </span>
        
      </div>

      {attendees.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-8">لا يوجد حاضرون حالياً</p>
      ) : (
        <div className="flex flex-col">
          {attendees.map((a, i) => (
            <AttendeeRow key={a.id} index={i} attendee={a} onCheckOut={onCheckOut} />
          ))}
        </div>
      )}
    </div>
  );
}
  // تسجيل زائر جديد 
function CheckInForm({ occupied, capacity, onCheckIn }) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(2);

  const isFull = occupied >= capacity;
  const isDisabled = name.trim() === '' || isFull;

  const handleSubmit = () => {
    if (isDisabled) return;
    onCheckIn({ name: name.trim(), hours });
    setName('');
    setHours(2);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const available = Math.max(capacity - occupied, 0);

  return (
    <div className="bg-white shadow rounded-3xl overflow-hidden glass-effect">
      <div className="bg-gradient-to-br from-[var(--receptionist-primary)] to-[var(--receptionist-secondary)] px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <RiUserAddLine className="text-white" size={20} />
        </div>
        <div>
          <p className="text-white font-bold">تسجيل زائر جديد</p>
          <p className="text-white/80 text-xs mt-0.5">{available} مقعد متاح</p>
        </div>
      </div>

      {/* الجسم */}
      <div className="p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">اسم الزائر</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="مثال: محمد خالد"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-right outline-none focus:border-[var(--receptionist-primary)] transition"
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 mb-3">عدد الساعات</p>
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setHours((h) => Math.max(1, h - 1))}
              className="w-10 h-10 rounded-full bg-[var(--receptionist-primary)] text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <RiSubtractLine />
            </button>
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-none">{hours}</p>
              <p className="text-xs text-slate-400 mt-1">{hoursLabel(hours)}</p>
            </div>
            <button
              type="button"
              onClick={() => setHours((h) => Math.min(12, h + 1))}
              className="w-10 h-10 rounded-full bg-[var(--receptionist-primary)] text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <RiAddLine />
            </button>
          </div>
        </div>
<button
  type="button"
  onClick={handleSubmit}
  className={`w-full rounded-2xl py-4 text-sm font-semibold flex items-center justify-center gap-2 transition ${
    isDisabled
      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
      : 'bg-gradient-to-br from-[var(--receptionist-primary)] to-[var(--receptionist-secondary)] text-white hover:opacity-90'
  }`}
>
  <RiUserAddLine className="text-xl" />
  {isFull ? 'لا يوجد مقاعد متاحة' : 'تسجيل وتحديث العداد'}
</button>

<div className="w-full mt-4">
  <div className="flex justify-between items-center text-xs mb-1.5">
    <span className="text-slate-400 font-medium">الطاقة الاستيعابية</span>
    <span className="text-[#0095D9] font-bold text-sm">{occupied}/{capacity}</span>
  </div>
  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden" dir="ltr">
    <div
      className="h-full rounded-full bg-[#0095D9]"
      style={{ width: `${Math.min((occupied / capacity) * 100, 100)}%` }}
    />
  </div>
</div>
      </div>
    </div>
  );
}


const ReceptionistDashboard = () => {
  const [attendees, setAttendees] = useState(INITIAL_ATTENDEES);
  const occupied = attendees.length; 

  const handleCheckOut = (id) => {
    setAttendees((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCheckIn = ({ name, hours }) => {
    const newAttendee = {
      id: crypto.randomUUID(),
      name,
      seat: '—',
      hours,
      checkInTime: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setAttendees((prev) => [newAttendee, ...prev]);
  };

  return (
       <div className="space-y-10 ">

      <PageHeader title="لوحة تحكم الاستقبال" icon={<RiCustomerService2Line />} role="receptionist" />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <OccupancyCard occupied={occupied} capacity={SPACE_CAPACITY} />
        </div>


        <div className="md:col-span-2 lg:col-span-3">
          <AttendeesList attendees={attendees} onCheckOut={handleCheckOut} />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <CheckInForm occupied={occupied} capacity={SPACE_CAPACITY} onCheckIn={handleCheckIn} />
        </div>

      </main>
    </div>
  );
};

export default ReceptionistDashboard;