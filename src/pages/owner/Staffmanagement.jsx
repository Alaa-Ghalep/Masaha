import { useState } from "react";
import {
  RiTeamLine,
  RiPencilLine,
  RiCloseCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import PageHeader from "../../components/layout/PageHeader";

const FIELDS = [
  { key: "name", label: "الاسم الكامل", type: "text", placeholder: "أدخل الاسم الكامل" },
  { key: "email", label: "البريد الإلكتروني", type: "email", placeholder: "أدخل البريد الإلكتروني" },
  { key: "password", label: "كلمة المرور", type: "password", placeholder: "أدخل كلمة المرور" },
  { key: "confirm", label: "تأكيد كلمة المرور", type: "password", placeholder: "أعد إدخال كلمة المرور" },
  { key: "phone", label: "رقم الهاتف", type: "text", placeholder: "أدخل رقم الهاتف" },
  { key: "shift", label: "الوردية", type: "select", placeholder: "صباحي / مسائي", options: ["صباحي", "مسائي"] },
];

const AVATAR_COLORS = ["bg-sky-500", "bg-pink-500", "bg-amber-500", "bg-purple-500", "bg-emerald-500"];

const INITIAL_STAFF = [
  { id: 1, name: "يوسف مصطفى", email: "yousef@space.ps", phone: "059-111-2233", shift: "صباحي", active: true, color: "bg-sky-500" },
  { id: 2, name: "مي سالم", email: "mai@space.ps", phone: "059-222-3366", shift: "مسائي", active: true, color: "bg-pink-500" },
  { id: 3, name: "عمر فارس", email: "omar@space.ps", phone: "059-333-4477", shift: "صباحي", active: false, color: "bg-amber-500" },
];

function StaffRow({ staff, onToggle }) {
  return (
    <div className="bg-white rounded-[10px] flex items-center justify-between gap-4 px-5 py-4 border-t border-slate-100  shadow-sm mb-3">
       <div className="flex items-center gap-3 flex-1 justify-start min-w-0">
        <div className="text-right min-w-0">
          <div className="flex ">

            <div
          className={`w-9 h-9 shrink-0 rounded-full ${staff.color} text-white flex items-center justify-center text-xs me-4 font-bold`}
        >
          {staff.name.trim().charAt(0)}
        </div>
          <div className="flex items-center justify-end gap-2 flex-wrap">
          <div>
           <div className="flex">
<p className="text-sm font-bold text-slate-800 truncate">{staff.name}</p>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                staff.active
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              {staff.active ? "نشط" : "معطل"}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">
              {staff.shift}
            </span>
           </div>    
              <p className="mt-1 text-[11px] text-slate-400 truncate">
            {staff.email} • {staff.phone}
          </p>
          </div>
          </div>
          </div>       
        </div>
       
      </div>

      <div className="flex items-center gap-2">
        <button className="text-slate-400 hover:text-[var(--primary)] transition">
          <RiPencilLine size={16} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className={`transition ${
            staff.active ? "text-red-400 hover:text-red-600" : "text-emerald-500 hover:text-emerald-600"
          }`}
        >
          {staff.active ? <RiCloseCircleLine size={18} /> : <RiCheckboxCircleLine size={18} />}
        </button>
      </div>

     
    </div>
  );
}

const StaffManagement = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "", shift: "" });
  const [staff, setStaff] = useState(INITIAL_STAFF);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () => setForm({ name: "", email: "", password: "", confirm: "", phone: "", shift: "" });

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.password &&
    form.password === form.confirm &&
    form.phone.trim() &&
    form.shift;

  const handleAdd = () => {
    if (!canSubmit) return;
    setStaff((prev) => [
      {
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        shift: form.shift,
        active: true,
        color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
      },
      ...prev,
    ]);
    resetForm();
  };

  const toggleStatus = (id) =>
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));

  return (
    <div dir="rtl" className="space-y-6 pb-20">
      <PageHeader title="إدارة الموظفين" icon={<RiTeamLine />} role="owner" />

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-800">إضافة موظف استقبال</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-xs font-bold text-slate-500">{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition mt-2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canSubmit}
            className={`flex-1 font-bold py-3 rounded-2xl transition ${
              canSubmit
                ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            إضافة
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-2xl"
          >
            إلغاء
          </button>
        </div>
      </div>

      <div className=" overflow-hidden">
        {staff.length ? (
          staff.map((s) => <StaffRow key={s.id} staff={s} onToggle={() => toggleStatus(s.id)} />)
        ) : (
          <p className="text-center text-xs text-slate-400 py-10">لا يوجد موظفون حالياً</p>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;