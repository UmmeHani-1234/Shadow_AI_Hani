import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ label, value, sub, trend, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12.5px] uppercase tracking-[0.24em] text-slate-500">{label}</div>
          <div className="mt-3 text-[28px] font-semibold text-slate-900">{value}</div>
        </div>
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
            <Icon size={16} />
          </span>
        )}
      </div>
      {sub && (
        <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500">
          {trend === "up" && <TrendingUp size={14} className="text-success" />}
          {trend === "down" && <TrendingDown size={14} className="text-danger" />}
          <span>{sub}</span>
        </div>
      )}
    </div>
  );
}
