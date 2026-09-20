import {
  RiLoginBoxLine,
  RiNotification3Line,
  RiStarSmileLine,
  RiLineChartLine,
  RiCalendarCheckLine,
} from "react-icons/ri";


const SUMMARY_CARDS = [
  {
    id: "today-bookings",
    label: "حجوزات اليوم",
    value: "32",
    subtext: "13% عن أمس",
    icon: <RiCalendarCheckLine />,
    iconBg: "bg-[var(--receptionist-primary)]",
  },
  {
    id: "satisfaction",
    label: "رضا العملاء",
    value: "94%",
    subtext: "أعلى من الشهر الماضي",
    icon: <RiStarSmileLine />,
    iconBg: "bg-violet-500",
  },
  {
    id: "avg-stay",
    label: "متوسط الإقامة",
    value: "5.2 ساعة",
    subtext: "لكل زائر",
    icon: <RiLineChartLine />,
    iconBg: "bg-sky-500",
  }
  
];

const PEAK_HOURS = [
  { id: "p1", range: "8ص - 10ص", percent: 65, color: "#3B82F6" },
  { id: "p2", range: "10ص - 12م", percent: 95, color: "#14B8A6" },
  { id: "p3", range: "12م - 4م", percent: 100, color: "#EF4444" },
  { id: "p4", range: "4م - 6م", percent: 78, color: "#F59E0B" },
  { id: "p5", range: "6م - 8م", percent: 45, color: "#A855F7" },
];

const WEEKLY_ATTENDANCE = [
  { id: "sun", label: "الأحد", value: 30 },
  { id: "mon", label: "الاثنين", value: 45 },
  { id: "tue", label: "الثلاثاء", value: 35 },
  { id: "wed", label: "الأربعاء", value: 52 },
  { id: "thu", label: "الخميس", value: 48 },
];

const CHART_MAX = 60;
const CHART_STEPS = [60, 45, 30, 15, 0];
const CHART_HEIGHT = 160; 

function SummaryCard({ card }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/50">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white ${card.iconBg}`}
      >
        {card.icon}
      </div>
      <div className="text-right">
        <p className="text-xs text-slate-400">{card.label}</p>
        <p className="text-xl font-bold text-slate-800">{card.value}</p>
        <p className="mt-0.5 text-xs text-slate-400">{card.subtext}</p>
      </div>
    </div>
  );
}

function PeakHoursCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
      <h2 className="mb-5 text-right text-base font-bold text-slate-800">
        توزيع أوقات الذروة
      </h2>

      <div className="space-y-4">
        {PEAK_HOURS.map((row) => (
          <div key={row.id}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-bold" style={{ color: row.color }}>
                {row.percent}%
              </span>
              <span className="text-slate-400">{row.range}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${row.percent}%`, backgroundColor: row.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyAttendanceCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
      <h2 className="mb-5 text-right text-base font-bold text-slate-800">
        الحضور الأسبوعي
      </h2>

      <div className="relative" style={{ height: CHART_HEIGHT }}>
        <div className="absolute inset-0 flex flex-col justify-between">
          {CHART_STEPS.map((step) => (
            <div key={step} className="flex items-center gap-2">
              <span className="w-6 text-left text-xs text-slate-300">
                {step}
              </span>
              <span className="h-px flex-1 bg-slate-100" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-end justify-between gap-3 pl-8">
          {WEEKLY_ATTENDANCE.map((day) => (
            <div key={day.id} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className="w-full max-w-[32px] rounded-t-md bg-sky-400"
                style={{ height: `${(day.value / CHART_MAX) * CHART_HEIGHT}px` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-3 pl-8">
        {WEEKLY_ATTENDANCE.map((day) => (
          <span key={day.id} className="flex-1 text-center text-xs text-slate-400">
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
}


export default function StatisticsPage() {
  return (
    <div  className="min-h-screen bg-slate-50">
    

      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <h1 className="mb-5  text-2xl font-bold text-slate-800 sm:text-3xl">
          الإحصائيات
        </h1>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SUMMARY_CARDS.map((card) => (
            <SummaryCard key={card.id} card={card} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <WeeklyAttendanceCard />
          <PeakHoursCard />
        </div>
      </div>
    </div>
  );
}