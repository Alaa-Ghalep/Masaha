import {
  RiCalendarCheckLine,
  RiBriefcase4Line,
  RiLineChartLine,
  RiStarFill,
  RiStarLine,
  RiPulseLine,
  RiStore2Line,
} from "react-icons/ri";
import PageHeader from '../../components/layout/PageHeader';


  // 'from-[var(--owner-primary)] to-[var(--owner-secondary)]'

const OWNER = "var(--owner-primary,var(--primary))";

const arNum = (n) => Number(n).toLocaleString("ar-EG");

const STATS = {
  todayBookings: 28,
  bookingsDelta: 8, 
  occupied: 22,
  capacity: 40,
  revenue: 440,
  avgPerHour: 55,
  rating: 4.8,
  reviewsCount: 124,
};

const RECENT_BOOKINGS = [
  { id: 1, name: "أحمد محمد", seat: "مقعد عادي", hours: 8, price: 120, status: "active" },
  { id: 2, name: "سارة حسن", seat: "مكتب خاص", hours: 4, price: 48, status: "done" },
  { id: 3, name: "خالد عمر", seat: "مقعد عادي", hours: 10, price: 60, status: "upcoming" },
  { id: 4, name: "ميسم علي", seat: "غرفة اجتماع", hours: 2, price: 40, status: "done" },
];

const STATUS_STYLES = {
  active: { label: "حالية", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  upcoming: { label: "قادمة", cls: "bg-sky-50 text-sky-600 border-sky-200" },
  done: { label: "منتهية", cls: "bg-slate-50 text-slate-500 border-slate-200" },
};

function StatCard({ icon, iconBg, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
     <div className="flex justify-between items-center">
  <div className="min-w-0">
    <p className="text-[11px] text-slate-500 font-medium">{label}</p>
    <div className="mt-0.5 text-2xl font-black text-slate-800 leading-tight">
      {value}
    </div>
  </div>
  <div
    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-white text-xl ${iconBg}`}
  >
    {icon}
  </div>
</div>
      <p className="text-[10px] text-slate-400">{sub}</p>
    </div>
  );
}

function BookingRow({ booking }) {
  const { name, seat, hours, price, status } = booking;
  const st = STATUS_STYLES[status];

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-slate-100">
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          {seat} • {hours} ساعات
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-sm font-black text-[var(--primary)]">
          {price}₪
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${st.cls}`}
        >
          {st.label}
        </span>
      </div>
    </div>
  );
}

const OwnerDashboard = () => {
  const s = STATS;

  return (
    <div dir="rtl" className="space-y-6 pb-20">
      <PageHeader title="لوحة تحكم المساحة" icon={<RiStore2Line />} role="owner"/>

      {/* الإحصائيات */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<RiCalendarCheckLine />}
          iconBg="bg-teal-500"
          label="حجوزات اليوم"
          value={arNum(s.todayBookings)}
          sub={`+${arNum(s.bookingsDelta)}٪ عن أمس`}
        />
        <StatCard
          icon={<RiBriefcase4Line />}
          iconBg="bg-sky-500"
          label="مشغول/متاح"
          value={`${arNum(s.occupied)}/${arNum(s.capacity)}`}
          sub={`${arNum(Math.round((s.occupied / s.capacity) * 100))}٪ إشغال`}
        />
        <StatCard
          icon={<RiLineChartLine />}
          iconBg="bg-orange-500"
          label="إيراد اليوم"
          value={`${arNum(s.revenue)}₪`}
          sub={`متوسط ${arNum(s.avgPerHour)}₪/ساعة`}
        />
        <StatCard
          icon={<RiStarFill />}
          iconBg="bg-purple-500"
          label="تقييم المساحة"
          value={
            <span className="flex items-center gap-1">
              <RiStarFill size={18} className="text-yellow-400" />
              {arNum(s.rating)}
            </span>
          }
          sub={`من ${arNum(s.reviewsCount)} تقييم`}
        />
      </div>

      {/* آخر الحجوزات */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-bold text-slate-800">آخر الحجوزات الجديدة</h2>
          <span
            className="flex items-center gap-1 text-[13px] text-[var(--primary)]"
           
          >
            يتحدث تلقائياً
            <RiPulseLine size={15} />

          </span>
        </div>

        {RECENT_BOOKINGS.length ? (
          RECENT_BOOKINGS.map((b) => <BookingRow key={b.id} booking={b} />)
        ) : (
          <p className="px-5 py-10 text-center text-xs text-slate-400 border-t border-slate-100">
            ما في حجوزات جديدة حتى الآن
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;