import { useState, useMemo, useEffect } from "react";
import {
  RiArrowRightLine,
  RiStarFill,
  RiStarLine,
  RiChat1Line,
  RiSendPlaneLine,
  RiThumbUpLine,
  RiThumbUpFill,
} from "react-icons/ri";


const STAR_COLOR = "#FFB900";

const INITIAL_REVIEWS = [
  {
    id: "r1",
    name: "سارة حسن",
    date: "12/09/2026",
    rating: 5,
    text: "المساحة الأفضل في المنطقة! الإنترنت 200 ميغا لا يصدق، والمسرح والبودكاست ممتازان جداً!",
    helpful: 15,
  },
  {
    id: "r2",
    name: "أحمد محمد",
    date: "03/09/2026",
    rating: 5,
    text: "استخدمت المساحة لاجتماع وكانت التجربة مذهلة، جميع التجهيزات متوفرة.",
    helpful: 11,
  },
  {
    id: "r3",
    name: "خالد عمر",
    date: "28/08/2026",
    rating: 4,
    text: "ممتاز، لكن السعر مرتفع قليلاً. الجودة تستحق ذلك رغم كل شيء.",
    helpful: 60,
  },
];

function Stars({ value, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= Math.round(value) ? (
          <RiStarFill key={n} size={size} style={{ color: STAR_COLOR }} />
        ) : (
          <RiStarFill key={n} size={size} className="text-slate-200" />
        )
      )}
    </div>
  );
}

function RatingSummary({ reviews }) {
  const total = reviews.length;

  const counts = useMemo(() => {
    const c = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => (c[r.rating] += 1));
    return c;
  }, [reviews]);

  const average = total
    ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
    : "0.0";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-5">
        <RiStarLine size={22} style={{ color: STAR_COLOR }} />
        <h2 className="text-lg font-bold text-slate-800">التقييمات والمراجعات</h2>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col items-center shrink-0">
          <span
            className="text-7xl font-extrabold leading-none"
            style={{ color: STAR_COLOR }}
          >
            {average}
          </span>
          <div className="mt-2">
            <Stars value={Number(average)} size={18} />
          </div>
          <span className="mt-1.5 text-[11px] text-slate-400">{total} تقييم</span>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = total ? (counts[star] / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-6 shrink-0 text-[11px] text-slate-500">
                  <span>{star}</span>
                  <RiStarFill size={10} style={{ color: STAR_COLOR }} />
                </div>
                <div
                  className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden"
                  dir="ltr"
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: STAR_COLOR }}
                  />
                </div>
                <span className="w-3 text-[11px] text-slate-400 text-center shrink-0">
                  {counts[star]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AddReview({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const canSubmit = rating > 0 && text.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ rating, text: text.trim() });
    setRating(0);
    setHover(0);
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <RiChat1Line size={16} className="text-[var(--primary)]" />
        <h3 className="text-sm font-bold text-slate-800">أضف تقييمك</h3>
      </div>

      <div
        className="flex items-center justify-center gap-2 mb-4"
        dir="ltr"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= (hover || rating);
          return (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} من 5`}
              className="p-0.5 transition-transform hover:scale-110"
            >
              {active ? (
                <RiStarFill size={28} style={{ color: STAR_COLOR }} />
              ) : (
                <RiStarLine size={28} className="text-slate-300" />
              )}
            </button>
          );
        })}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="اكتب مراجعتك هنا... ماذا أعجبك؟ هل توصي بها؟"
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/15"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`mt-3 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
          canSubmit
            ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)]"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <RiSendPlaneLine size={14} />
        نشر التقييم
      </button>
    </div>
  );
}

function ReviewCard({ review, onToggleHelpful }) {
  const { name, date, rating, text, helpful, liked } = review;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
          {name.trim().charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{name}</p>
              <p className="text-[10px] text-slate-400">{date}</p>
            </div>
            <Stars value={rating} size={11} />
          </div>

          <p className="mt-2 text-xs leading-relaxed text-slate-600">{text}</p>

          <button
            type="button"
            onClick={() => onToggleHelpful(review.id)}
            className={`mt-3 flex items-center gap-1 text-[11px] transition ${
              liked
                ? "text-[var(--primary)] font-bold"
                : "text-slate-400 hover:text-[var(--primary)]"
            }`}
          >
            {liked ? <RiThumbUpFill size={12} /> : <RiThumbUpLine size={12} />}
            مفيد ({helpful})
          </button>
        </div>
      </div>
    </div>
  );
}

// parent-componengt 
export default function ReviewsView({
  workspaceName = "مساحة الزيادة",
  initialReviews = INITIAL_REVIEWS,
  onBack,
}) {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleAdd = ({ rating, text }) => {
    setReviews((prev) => [
      {
        id: crypto.randomUUID(),
        name: "أنت",
        date: new Date().toLocaleDateString("en-GB"),
        rating,
        text,
        helpful: 0,
        liked: false,
      },
      ...prev,
    ]);
  };

  const toggleHelpful = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, helpful: r.helpful + (r.liked ? -1 : 1) }
          : r
      )
    );
  };

  return (
    <div dir="rtl" className=" w-full  pb-10 pt-4">
      
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-[var(--primary)]"
      >
        <RiArrowRightLine size={14} />
        {workspaceName}
      </button>

      <div className="flex flex-col gap-4">
        <RatingSummary reviews={reviews} />
        <AddReview onSubmit={handleAdd} />

        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} onToggleHelpful={toggleHelpful} />
          ))}
        </div>
      </div>
    </div>
  );
}