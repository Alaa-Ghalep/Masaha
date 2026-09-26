import { useState } from "react";
import {
  RiCalendarEventLine,
  RiAddLine,
  RiSubtractLine,
  RiPencilLine,
  RiCloseLine,
  RiInformationLine,
} from "react-icons/ri";
import Header from "../../components/layout/PageHeader";

const HOURS = Array.from({ length: 15 }, (_, i) => {
  const h = 8 + i;
  return `${String(h).padStart(2, "0")}:00`;
});

const STATUS = {
  upcoming: { label: "قادمة", cls: "bg-sky-50 text-sky-600 border-sky-200" },
  done: { label: "مكتملة", cls: "bg-slate-50 text-slate-500 border-slate-200" },
};

const INITIAL_EVENTS = [
  { id: 1, title: "ورشة تطوير الويب", date: "٢٠٢٤/١٢/٢٥", time: "٠٢:٠٠م", status: "upcoming", joined: 18, capacity: 25 },
  { id: 2, title: "جلسة ريادة الأعمال", date: "٢٠٢٤/١٢/٢٢", time: "٠٤:٠٠م", status: "done", joined: 30, capacity: 30 },
];

const emptyDay = (n) => ({ id: crypto.randomUUID(), from: "09:00", to: "17:00" });

function EventCard({ event, onDelete }) {
  const st = STATUS[event.status];
  const pct = event.capacity ? Math.min(100, Math.round((event.joined / event.capacity) * 100)) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
     <div className="text-right">
          <p className="text-sm font-bold text-slate-800">{event.title}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            {event.date} - {event.time}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-[var(--primary)] transition">
            <RiPencilLine size={16} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 transition"
          >
            <RiCloseLine size={16} />
          </button>
          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${st.cls}`}>
            {st.label}
          </span>
        </div>
       
      </div>

      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden" dir="ltr">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400">  
        <span>المشتركون</span>
        <span>
          {event.joined}/{event.capacity}
        </span>
      
      </div>
    </div>
  );
}

const EventsManagement = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [schedule, setSchedule] = useState([emptyDay(1)]);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const addDay = () => setSchedule((s) => [...s, emptyDay(s.length + 1)]);
  const removeDay = () => setSchedule((s) => (s.length <= 1 ? s : s.slice(0, -1)));

  const addDayAfter = (id) =>
    setSchedule((s) => {
      const idx = s.findIndex((d) => d.id === id);
      const copy = [...s];
      copy.splice(idx + 1, 0, emptyDay());
      return copy;
    });

  const removeDaySpecific = (id) =>
    setSchedule((s) => (s.length <= 1 ? s : s.filter((d) => d.id !== id)));

  const updateSchedule = (id, field, value) =>
    setSchedule((s) => s.map((d) => (d.id === id ? { ...d, [field]: value } : d)));

  const resetForm = () => {
    setTitle("");
    setDate("");
    setStartTime("");
    setCapacity("");
    setSchedule([emptyDay(1)]);
  };

  const canSubmit = title.trim() && date && startTime && capacity;

  const handleAdd = () => {
    if (!canSubmit) return;
    setEvents((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        date,
        time: startTime,
        status: "upcoming",
        joined: 0,
        capacity: Number(capacity) || 0,
      },
      ...prev,
    ]);
    resetForm();
  };

  const handleDelete = (id) => setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div dir="rtl" className="space-y-6 pb-20">
      <Header title="الفعاليات والورش" icon={<RiCalendarEventLine /> } role="owner" />

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-800">إضافة فعالية جديدة</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">عنوان الفعالية</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان الفعالية"
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">التاريخ</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">تاريخ بداية الفعالية</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">الطاقة الاستيعابية</label>
            <input
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="أدخل الطاقة الاستيعابية"
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 text-right">عدد أيام الفعالية</p>
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={addDay}
              className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-md shadow-[var(--primary)]/20"
            >
              <RiAddLine size={18} />
            </button>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-800 leading-none">{schedule.length}</p>
              <p className="text-[10px] text-slate-400 mt-1">
                {schedule.length === 1 ? "يوم واحد" : "أيام"}
              </p>
            </div>
            <button
              type="button"
              onClick={removeDay}
              className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
            >
              <RiSubtractLine size={18} />
            </button>
          </div>
        
        </div>
  <p className="flex font-bold text-[13px] text-[var(--primary)]">
            أوقات كل يوم — يتم توليدها تلقائياً حسب عدد الأيام
          </p>
        <div className="space-y-3">
          {schedule.map((day, i) => (
            <div key={day.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-[11px] flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-md font-bold text-[var(--primary)]">
                    اليوم {i === 0 ? "الأول" : i + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addDayAfter(day.id)}
                    className="px-5 py-3 rounded-lg bg-[var(--primary)] text-white bg-[var(--primary)] text-[11px] font-bold transition"
                  >
                    إضافة
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDaySpecific(day.id)}
                    disabled={schedule.length <= 1}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                      schedule.length <= 1
                        ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    إلغاء
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">من الساعة</span>
                  <select
                    value={day.from}
                    onChange={(e) => updateSchedule(day.id, "from", e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 text-center outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition"
                  >
                    {HOURS.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <span className="text-slate-300 font-bold mt-4">—</span>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">إلى الساعة</span>
                  <select
                    value={day.to}
                    onChange={(e) => updateSchedule(day.id, "to", e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 text-center outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition"
                  >
                    {HOURS.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="space-y-4">
        {events.length ? (
          events.map((ev) => <EventCard key={ev.id} event={ev} onDelete={() => handleDelete(ev.id)} />)
        ) : (
          <p className="text-center text-xs text-slate-400 py-10">لا توجد فعاليات حالياً</p>
        )}
      </div>
    </div>
  );
};

export default EventsManagement;