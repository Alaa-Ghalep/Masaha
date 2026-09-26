import { useState } from "react";
import { RiPriceTag3Line } from "react-icons/ri";
import PageHeader from "../../components/layout/PageHeader";

const STATUS = {
  active: { label: "نشط", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  expired: { label: "منتهي", cls: "bg-slate-50 text-slate-500 border-slate-200" },
};

const INITIAL_OFFERS = [
  { id: 1, title: "خصم ٪30 على الحجوزات الأسبوعية", code: "MEX30", status: "active", discount: 30, expiry: "2024/12/31", used: 45, limit: 100 },
  { id: 2, title: "ساعة مجانية مع كل حجز 4 ساعات", code: "FREE1H", status: "active", discount: 0, expiry: "2024/12/25", used: 89, limit: 100 },
  { id: 3, title: "عضوية شهرية بسعر اليومي", code: "MONTHLY40", status: "expired", discount: 40, expiry: "2024/11/30", used: 100, limit: 100 },
];

function OfferCard({ offer }) {
  const st = STATUS[offer.status];
  const pct = offer.limit ? Math.min(100, Math.round((offer.used / offer.limit) * 100)) : 0;

  return (
    <div className="bg-white rounded-2xl border border-amber-500 shadow-md p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
       
        <div className="text-right min-w-0">
          
          <p className="mt-1 text-sm font-bold text-slate-800">{offer.title}</p>
          <div className="flex items-center justify-start mt-3 gap-2 flex-wrap">
             <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500">
              {offer.code}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${st.cls}`}>
              {st.label}
            </span>
           
          </div>
        </div>
     

         <span className="px-2.5 py-1 rounded-lg bg-[var(--accent-alt)] text-white text-xs font-black shrink-0">
          -{offer.discount}%
        </span>
      </div>
   <div>
        <span className="text-[11px] text-slate-400">ينتهي بتاريخ {offer.expiry}</span>
        </div>
      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden" dir="ltr">
        <div
          className="h-full rounded-full bg-[var(--accent-alt)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>
          استخدام {offer.used}/{offer.limit}
        </span>
      </div>
    </div>
  );
}

const OffersManagement = () => {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [code, setCode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [offers, setOffers] = useState(INITIAL_OFFERS);

  const resetForm = () => {
    setTitle("");
    setDiscount("");
    setCode("");
    setExpiry("");
  };

  const canSubmit = title.trim() && discount && code.trim() && expiry;

  const handleLaunch = () => {
    if (!canSubmit) return;
    setOffers((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        code: code.toUpperCase(),
        status: "active",
        discount: Number(discount) || 0,
        expiry,
        used: 0,
        limit: 100,
      },
      ...prev,
    ]);
    resetForm();
  };

  return (
    <div dir="rtl" className="space-y-6 pb-20">
      <PageHeader title="العروض والخصومات" icon={<RiPriceTag3Line />}role="owner" />

      <div className="bg-white p-8 border border-amber-500 rounded-[32px]  space-y-6">
        <h3 className="font-bold text-slate-800">إطلاق خصم جديد</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">عنوان العرض</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان العرض"
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">نسبة الخصم %</label>
            <input
              type="number"
              min="1"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="أدخل نسبة الخصم %"
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">كود الخصم</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="أدخل كود الخصم"
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">تاريخ الانتهاء</label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleLaunch}
            disabled={!canSubmit}
            className={`flex-1 font-bold py-3 rounded-2xl transition ${
              canSubmit
                ? "bg-[var(--accent-alt)]  text-white shadow-lg shadow-[var(--primary)]/20"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            إطلاق
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

      <div className="space-y-4">
        {offers.length ? (
          offers.map((o) => <OfferCard key={o.id} offer={o} />)
        ) : (
          <p className="text-center text-xs text-slate-400 py-10">لا توجد عروض حالياً</p>
        )}
      </div>
    </div>
  );
};

export default OffersManagement;