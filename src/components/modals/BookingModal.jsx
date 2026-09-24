import { RiAddLine, RiSubtractLine, RiUploadCloud2Line, RiCloseLine, RiTimeLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';

const SPACE_NAME = 'مساحة الريادة';
const PRICE_PER_HOUR = 20; 
const SEAT_TYPES = ['مقعد عادي', 'مقعد VIP', 'غرفة خاصة'];

const BookingModal = ({ isOpen, onClose }) => {
  const [hours, setHours] = useState(4);
  const [seatIndex, setSeatIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const seatType = SEAT_TYPES[seatIndex];
  const totalPrice = hours * PRICE_PER_HOUR;

  const handleNextSeat = () => setSeatIndex((i) => (i + 1) % SEAT_TYPES.length);
  const handlePrevSeat = () => setSeatIndex((i) => (i - 1 + SEAT_TYPES.length) % SEAT_TYPES.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-8 relative shadow-2xl space-y-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-slate-300 hover:text-danger transition"
        >
          <RiCloseLine size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800">احجز مقعدك</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">
            {SPACE_NAME} • {PRICE_PER_HOUR}₪/ساعة
          </p>
        </div>

        {/* Hours Counter */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <RiTimeLine className="text-[var(--primary)]" size={16} /> عدد الساعات
          </label>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <button
              onClick={() => setHours((h) => h + 1)}
              className="w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 cursor-pointer"
            >
              <RiAddLine size={24} />
            </button>
            <div className="text-center">
              <span className="text-3xl font-black text-slate-800">{hours}</span>
              <p className="text-[10px] text-[var(--primary)] font-bold">ساعات</p>
            </div>
            <button
              onClick={() => setHours((h) => Math.max(1, h - 1))}
              className="w-12 h-12 bg-white border border-[var(--primary)] text-[var(--primary)] rounded-2xl flex items-center justify-center shadow-sm cursor-pointer"
            >
              <RiSubtractLine size={24} />
            </button>
          </div>
          <p className="text-[11px] font-bold text-[var(--primary)] text-right">
            {totalPrice}₪ إجمالي
          </p>
        </div>

        {/* Seat Type */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-2">
            🪑 نوع المقعد
          </label>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <button
              onClick={handleNextSeat}
              className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center shadow-md cursor-pointer"
            >
              ›
            </button>
            <span className="font-bold text-slate-700">{seatType}</span>
            <button
              onClick={handlePrevSeat}
              className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center shadow-md cursor-pointer"
            >
              ‹
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {SEAT_TYPES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === seatIndex ? 'w-4 bg-[var(--primary)]' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Payment Info & Upload */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-2">
            🏦 إشعار التحويل البنكي
          </label>
          <div className="bg-[var(--primary)]/5 p-4 rounded-3xl border border-[var(--primary)]/20">
            <p className="text-[10px] text-[var(--primary)] leading-relaxed font-bold">
              يرجى التحويل إلى بنك فلسطين: 1234 5678 9012 0000
              <br />
              أو جوال باي: 0591234567 • المبلغ المطلوب: {totalPrice}₪
            </p>
          </div>
          <div className="border-2 border-dashed border-[var(--primary)]/20 bg-slate-50 rounded-3xl p-8 flex flex-col items-center gap-3 group cursor-pointer hover:bg-white transition-all">
            <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <RiUploadCloud2Line size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-500">ارفع صورة إشعار التحويل</p>
            <span className="text-[8px] text-slate-300">PNG, JPG, PDF — الحد الأقصى 5MB</span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 p-4 rounded-2xl text-[10px] space-y-1">
          <div className="flex justify-between font-bold text-slate-400">
            <span>المساحة</span>
            <span>{SPACE_NAME}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-400">
            <span>المدة</span>
            <span>{hours} ساعة</span>
          </div>
          <div className="flex justify-between font-bold text-slate-400">
            <span>نوع المقعد</span>
            <span>{seatType}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-200 mt-1">
            <span>الإجمالي</span>
            <span className="text-[var(--primary)] text-base">{totalPrice}₪</span>
          </div>
        </div>

        <button className="w-full bg-[var(--primary)] text-white font-black py-5 rounded-3xl shadow-xl shadow-[var(--primary)]/30 cursor-pointer">
          تأكيد الحجز
        </button>
      </div>
    </div>
  );
};

export default BookingModal;