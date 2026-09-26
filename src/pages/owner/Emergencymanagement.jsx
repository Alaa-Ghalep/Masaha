import { useState } from "react";
import {
  RiAlertLine,
  RiFlashlightLine,
  RiWifiOffLine,
  RiToolsLine,
  RiFireLine,
} from "react-icons/ri";
import PageHeader from "../../components/layout/PageHeader";

const ACTIONS = [
  { id: 1, label: "انقطاع الكهرباء المفاجئ", icon: <RiFlashlightLine /> },
  { id: 2, label: "مشكلة في الشبكة", icon: <RiWifiOffLine /> },
  { id: 3, label: "صيانة طارئة", icon: <RiToolsLine /> },
  { id: 4, label: "حريق أو طارئ أمني", icon: <RiFireLine /> },
];

const EmergencyManagement = () => {
  const [closed, setClosed] = useState(false);
  const [notified, setNotified] = useState(null);

  const handleClose = () => {
    setClosed(true);
  };

  const notify = (id) => {
    setNotified(id);
    setTimeout(() => setNotified(null), 2000);
  };

  return (
    <div dir="rtl" className="space-y-6 pb-20">
      <PageHeader title="إدارة الطوارئ" icon={<RiAlertLine />}role="owner" />

      <div className="bg-white p-8 rounded-[32px] border border-red-100 space-y-4 text-center shadow-lg">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <RiAlertLine size={28} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">إغلاق المساحة طارئ</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          في حالة الطوارئ اضغط الزر أدناه لإغلاق المساحة وإشعار جميع المستخدمين فوراً
        </p>
        <button
          type="button"
          onClick={handleClose}
          disabled={closed}
          className={`mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition ${
            closed
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
          }`}
        >
          <RiAlertLine size={16} />
          {closed ? "تم إغلاق المساحة" : "إغلاق المساحة + إرسال إشعار"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidde">
        <div className="px-5 py-4">
          <h3 className="font-bold text-slate-800 text-sm">إجراءات الطوارئ</h3>
        </div>
        {ACTIONS.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-slate-100"
          >
             <div className="flex items-center gap-2">
               <span className="text-red-400">{a.icon}</span>
              <span className="text-sm font-bold text-slate-700">{a.label}</span>
             
            </div>
            <button
              type="button"
              onClick={() => notify(a.id)}
              className="px-4 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition"
            >
              {notified === a.id ? "تم الإرسال" : "إشعار"}
            </button>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyManagement;