import { RiCamera3Line, RiCloseLine, RiSave3Line } from 'react-icons/ri';

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[48px] p-10 relative shadow-2xl space-y-10 animate-in slide-in-from-top-10 duration-500">
        <button onClick={onClose} className="absolute top-8 left-8 text-slate-300 hover:text-danger"><RiCloseLine size={28} /></button>
        
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-800">تعديل البروفايل</h2>
            <p className="text-xs text-slate-400 font-bold">حدث بياناتك الشخصية هنا</p>
        </div>

        {/* Profile Pic Upload */}
        <div className="flex justify-center">
            <div className="relative group">
                <div className="w-32 h-32 bg-brand-500 rounded-[40px] flex items-center justify-center text-5xl text-white font-black shadow-xl">أ</div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-brand-500 cursor-pointer hover:bg-brand-500 hover:text-white transition-all border border-slate-100">
                    <RiCamera3Line size={20} />
                    <input type="file" className="hidden" accept="image/*" />
                </label>
            </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
            {[
                { label: 'الاسم الكامل', val: 'أحمد محمد' },
                { label: 'البريد الإلكتروني', val: 'ahmed.m@example.com' },
                { label: 'رقم الهاتف', val: '059-123-4567' },
                { label: 'كلمة المرور', val: '********' }
            ].map((f, i) => (
                <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase pr-2 tracking-wider">{f.label}</label>
                    <input 
                        type="text" 
                        defaultValue={f.val} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all"
                    />
                </div>
            ))}
        </div>

        <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 font-black py-4 rounded-3xl transition-colors">إلغاء</button>
            <button className="flex-1 bg-brand-500 text-white font-black py-4 rounded-3xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
                <RiSave3Line /> حفظ التغييرات
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;