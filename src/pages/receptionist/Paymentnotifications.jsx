import { useState } from "react";
import {
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiImageLine,
  RiCloseLine,
  RiCheckLine,
} from "react-icons/ri";
import WifiActivationModal from '../../components/modals/WifiActivationModal';

import PageHeader from '../../components/layout/PageHeader';

const INITIAL_NOTIFICATIONS = [
  {
    id: "pn-1001",
    customerName: "أحمد محمد",
    spaceName: "مساحة الإبداع",
    seatType: "مقعد عادي",
    date: "٢٠٢٤/١٢/٢٠",
    time: "٩:٠٠ ص",
    amount: 120,
    receiptUrl: "",
    status: "pending", 
  },
  {
    id: "pn-1002",
    customerName: "سارة خالد",
    spaceName: "مساحة الإبداع",
    seatType: "مكتب خاص",
    date: "٢٠٢٤/١٢/١٩",
    time: "١١:٠٠ ص",
    amount: 200,
    receiptUrl: "",
    status: "pending",
  },
];

const PROCESSED_STYLES = {
  confirmed: {
    label: "تم التأكيد",
    className:
      "bg-[var(--receptionist-primary)]/10 text-[var(--receptionist-primary)]",
  },
  rejected: {
    label: "مرفوض",
    className: "bg-red-50 text-red-500",
  },
};


function ReceiptThumb({ url, alt }) {
  return (
    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-300 bg-slate-800">
      {url ? (
        <img src={url} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-500">
          <RiImageLine className="text-lg" />
        </div>
      )}
    </div>
  );
}

function PaymentNotificationCard({ notification, onConfirm, onReject, onView }) {
const [activeNotification, setActiveNotification] = useState(null);

  return (
    <article className="rounded-3xl border-2 border-amber-200 bg-white p-4 shadow-sm shadow-amber-100/60 sm:p-5">
      <div className="mb-4 flex  justify-between gap-4">
       
        <div className="flex  gap-3">
            <ReceiptThumb
            url={notification.receiptUrl}
            alt={`إيصال ${notification.customerName}`}
          />
          <div className="text-right">
            <h3 className="text-base font-bold text-slate-800">
              {notification.customerName}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {notification.spaceName} • {notification.seatType}
            </p>
            <p className="mt-1 flex items-center justify-end gap-1.5 text-sm text-slate-400">
              <span>
                {notification.date} — {notification.time}
              </span>
              <RiCalendarLine className="text-base" />
            </p>
          </div>

        
        </div>
         <p className="text-lg font-bold text-[var(--receptionist-primary)]">
          {notification.amount}₪
        </p>

      </div>

      <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveNotification(notification)} 
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            تأكيد وتفعيل
            <RiCheckboxCircleLine className="text-lg" />
          </button>

        <button
          type="button"
          onClick={() => onView(notification.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          عرض الإشعار
          <RiImageLine className="text-lg" />
        </button>

        <button
          type="button"
          onClick={() => onReject(notification.id)}
          aria-label="رفض الإشعار"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500 transition-colors hover:bg-red-100"
        >
          <RiCloseLine />
        </button>
      </div>
     <WifiActivationModal
        isOpen={!!activeNotification}
        onClose={() => setActiveNotification(null)}
        notification={activeNotification}
        onConfirm={(id, credentials) => {
          onConfirm(id, credentials);     
          setActiveNotification(null);
        }}
        />
 
    </article>
    
  );
}


function ProcessedRow({ notification }) {
  const style = PROCESSED_STYLES[notification.status];

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}
      >
        {style.label}
      </span>

      <div className="text-right">
        <p className="text-sm font-bold text-slate-800">
          {notification.customerName}
        </p>
        <p className="text-xs text-slate-400">
          {notification.amount}₪ • {notification.date}
        </p>
      </div>
    </div>
  );
}

export default function PaymentNotifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const pending = notifications.filter((n) => n.status === "pending");
  const processed = notifications.filter((n) => n.status !== "pending");

  const updateStatus = (id, status) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status } : n))
    );

  const handleConfirm = (id) => updateStatus(id, "confirmed");
  const handleReject = (id) => updateStatus(id, "rejected");
  const handleView = (id) => {
    console.log("عرض إشعار:", id);
  };

  return (
    <div  className="min-h-screen bg-slate-50 p-4 sm:p-6">      
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-start justify-between gap-4">
           <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              إشعارات الدفع
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              مراجعة إشعارات التحويل وتأكيد الحجوزات
            </p>
          </div>

          <span className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {pending.length} بانتظار المراجعة
          </span>

         
        </header>

        <section className="mb-8">
          <h2 className="mb-3 flex items-center  gap-2 text-sm font-bold text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            بانتظار المراجعة ({pending.length})
          </h2>

          {pending.length > 0 ? (
            <div className="space-y-4">
              {pending.map((notification) => (
                <PaymentNotificationCard
                  key={notification.id}
                  notification={notification}
                  onConfirm={handleConfirm}
                  onReject={handleReject}
                  onView={handleView}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <RiCheckLine className="text-2xl text-[var(--receptionist-primary)]" />
              <p className="text-sm text-slate-400">
                تمت مراجعة كل الإشعارات
              </p>
            </div>
          )}
        </section>

        {processed.length > 0 && (
          <section>
            <h2 className="mb-3 text-right text-sm font-bold text-slate-500">
              تمت المراجعة ({processed.length})
            </h2>
            <div className="space-y-3">
              {processed.map((notification) => (
                <ProcessedRow key={notification.id} notification={notification} />
              ))}
            </div>
          </section>
        )}
             

      </div>

    </div>
    
  );
}