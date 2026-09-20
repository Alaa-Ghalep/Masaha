import { useState } from "react";
import {
  RiNotification3Line,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiWalletLine,
  RiCloseCircleLine,
  RiAlarmLine,
  RiCloseLine,
} from "react-icons/ri";


const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "new-booking",
    title: "حجز جديد",
    description: "أحمد محمد حجز مقعد في مساحة الإبداع ليوم 20 ديسمبر من 9ص إلى 5م.",
    time: "منذ 5 دقائق",
    unread: true,
  },
  {
    id: "n2",
    type: "check-in",
    title: "تسجيل وصول",
    description: "سارة حسن سجّلت دخولها في المقعد B-05 الساعة 9:30 ص.",
    time: "منذ 20 دقيقة",
    unread: true,
  },
  {
    id: "n3",
    type: "payment",
    title: "إشعار دفع برفقة",
    description: "خالد عمر رفع إشعار التحويل لحجزه، يرجى مراجعته وتأكيده.",
    time: "منذ ساعة",
    unread: true,
  },
  {
    id: "n4",
    type: "cancelled",
    title: "إلغاء حجز",
    description: "ميسم علي ألغت حجزها في مساحة الريادة ليوم 22 ديسمبر.",
    time: "منذ 3 ساعات",
    unread: false,
  },
  {
    id: "n5",
    type: "reminder",
    title: "تذكير: حجز غدًا",
    description: "يوجد 4 حجوزات مؤكدة لغدًا، تأكد من تجهيز المقاعد وتسجيل الحضور.",
    time: "منذ 5 ساعات",
    unread: false,
  },
];

const TYPE_STYLES = {
  "new-booking": { icon: <RiCalendarLine />, iconBg: "bg-blue-500" },
  "check-in": { icon: <RiCheckboxCircleLine />, iconBg: "bg-[var(--receptionist-primary)]" },
  payment: { icon: <RiWalletLine />, iconBg: "bg-amber-500" },
  cancelled: { icon: <RiCloseCircleLine />, iconBg: "bg-red-500" },
  reminder: { icon: <RiAlarmLine />, iconBg: "bg-violet-500" },
};


function NotificationRow({ notification, onDismiss }) {
  const style = TYPE_STYLES[notification.type];

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 transition-colors ${
        notification.unread
          ? "border-[var(--receptionist-primary)]/20 bg-[var(--receptionist-primary)]/[0.03]"
          : "border-slate-100 bg-white"
      }`}
    >
      
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base text-white ${style.iconBg}`}
      >
        {style.icon}
      </div>
     

      <div className="flex-1 text-right">
        <h3 className="text-sm font-bold text-slate-800">{notification.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {notification.description}
        </p>
        <p className="mt-2 text-xs text-slate-300">{notification.time}</p>
      </div>
 <div className="flex w-4 shrink-0 flex-col items-center gap-2 pt-1">
        {notification.unread && (
          <span className="h-2 w-2 rounded-full bg-[var(--receptionist-primary)]" />
        )}
        <button
          type="button"
          onClick={() => onDismiss(notification.id)}
          aria-label="إغلاق الإشعار"
          className="text-slate-300 transition-colors hover:text-slate-500"
        >
          <RiCloseLine className="text-sm" />
        </button>
      </div>
    </div>
  );
}


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleDismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const handleMarkAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div className="min-h-screen">
 

      <div className="mx-auto w-full p-4 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              الإشعارات
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {unreadCount} إشعارات غير مقروءة
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="whitespace-nowrap text-sm font-semibold text-[var(--receptionist-primary)] hover:underline"
            >
              تعليم الكل كمقروء
            </button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-400">لا توجد إشعارات حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
}