import { Activity, ShieldCheck, Upload, ClipboardList, AlertTriangle, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { evidenceFactors } from "../../data/mockData.js";
import KpiCard from "../../components/ui/KpiCard.jsx";
import { RiskBadge } from "../../components/ui/Badge.jsx";

export default function HospitalSurveillance() {
  const { currentHospital, currentAlerts } = useAuth();

  const surveillanceSignals = useMemo(
    () => evidenceFactors.map(([label, score], index) => ({ label, score, status: score > 70 ? "High" : score > 45 ? "Elevated" : "Stable" })),
    []
  );

  return (
    <div className="grid gap-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Hospital surveillance</p>
            <h1 className="text-[22px] font-semibold text-slate-900 mt-2">Daily reporting & signal validation</h1>
            <p className="mt-3 text-[13.5px] text-slate-500 max-w-2xl leading-6">
              Monitor internal data quality, trending evidence, and the signals that feed ShadowDoctor's early warnings.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <KpiCard label="Open alerts" value={currentAlerts.length} sub="pending review" icon={AlertTriangle} />
            <KpiCard label="Submission score" value={`${currentHospital?.completeness ?? 0}%`} sub="data completeness" icon={Upload} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Evidence factors</p>
              <h2 className="text-xl font-semibold text-slate-900 mt-2">What changed this cycle</h2>
            </div>
            <ClipboardList className="text-blue-600" />
          </div>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            {surveillanceSignals.map((signal, index) => (
              <div key={signal.label} className="data-row">
                <div className="data-row-details">
                  <span className="icon-chip-sm bg-danger-tint text-danger border-transparent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
                  </span>
                  <div className="data-row-copy">
                    <p className="data-row-label">{signal.label}</p>
                    <p className="data-row-meta">Score: {signal.score}</p>
                  </div>
                </div>
                <RiskBadge level={signal.status === "High" ? "High" : signal.status === "Elevated" ? "Medium" : "Low"} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Workflow health</p>
              <h2 className="text-xl font-semibold text-slate-900 mt-2">Submission and model readiness</h2>
            </div>
            <ShieldCheck className="text-slate-600" />
          </div>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            <div className="data-row">
              <div>
                <p className="data-row-label">Latest upload</p>
                <p className="data-row-meta">{currentHospital?.lastActivity}</p>
              </div>
            </div>
            <div className="data-row">
              <div>
                <p className="data-row-label">Data validation</p>
                <p className="data-row-meta">Good</p>
              </div>
            </div>
            <div className="data-row border-b-0">
              <div>
                <p className="data-row-label">Recommended action</p>
                <p className="data-row-meta">Confirm recent case counts and lab results</p>
              </div>
            </div>
          </div>
          <button className="btn-primary w-full mt-6">
            <Upload size={16} /> Submit fresh surveillance data
          </button>
        </div>
      </div>
    </div>
  );
}
