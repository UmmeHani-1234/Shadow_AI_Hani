import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, ClipboardList, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useAuth } from "../../context/AuthContext.jsx";
import { trendData, regionalRisk, notificationUsers } from "../../data/mockData.js";
import { RiskBadge } from "../../components/ui/Badge.jsx";

export default function HospitalOverview() {
  const { currentHospital, currentAlerts, hospitals, alertsByHospital } = useAuth();
  const navigate = useNavigate();

  const needsReview = currentAlerts.filter((a) => a.status === "Needs review").length;
  const topAlert = [...currentAlerts].sort((a, b) => b.probability - a.probability)[0];

  const hospitalUsers = useMemo(
    () => notificationUsers.filter((user) => user.hospitalId === currentHospital?.id),
    [currentHospital]
  );

  const regionalSummary = useMemo(
    () => regionalRisk.slice(0, 4),
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">{currentHospital?.name}</p>
            <h1 className="text-3xl font-semibold text-slate-900 mt-2">{currentHospital?.region} hospital dashboard</h1>
            <p className="mt-3 text-sm text-slate-500 max-w-2xl">
              Fast, explainable early-warning alerts for your hospital, regional comparison, and submission workflow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Active alerts</div>
              <div className="text-3xl font-bold text-slate-900 mt-3">{currentAlerts.length}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">High risk</div>
              <div className="text-3xl font-bold text-slate-900 mt-3">{currentAlerts.filter((a) => a.risk === "High").length}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Submitted today</div>
              <div className="text-3xl font-bold text-slate-900 mt-3">{currentHospital?.lastActivity?.includes("min") ? "Yes" : "No"}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Registered users</div>
              <div className="text-3xl font-bold text-slate-900 mt-3">{hospitalUsers.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">Hospital</h3>
            <p className="mt-2 font-semibold text-slate-900">{currentHospital?.name}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">Address</h3>
            <p className="mt-2 text-slate-700">{currentHospital?.address}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">Contact</h3>
            <p className="mt-2 text-slate-700">{currentHospital?.contactEmail}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">Registered</h3>
            <p className="mt-2 text-slate-700">{currentHospital?.registeredAt}</p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.75fr]">
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Early Warning Alerts</p>
                <h2 className="text-xl font-semibold text-slate-900 mt-2">What needs your attention first</h2>
              </div>
              <button className="btn-secondary">View all alerts</button>
            </div>

            {topAlert ? (
              <div className="grid gap-4 md:grid-cols-[1.3fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm uppercase tracking-[0.28em] text-slate-500">{topAlert.disease}</div>
                      <div className="text-2xl font-semibold text-slate-900 mt-2">{currentHospital?.region} region</div>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-blue-600 shadow-sm">
                      {topAlert.window}
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                      <div className="text-sm text-slate-500">Probability</div>
                      <div className="text-4xl font-bold text-slate-900">{topAlert.probability}%</div>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                      <div className="text-sm text-slate-500">Risk</div>
                      <div className="text-3xl font-bold text-slate-900">{topAlert.risk}</div>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                      <div className="text-sm text-slate-500">Review status</div>
                      <div className="text-sm font-semibold text-slate-800 mt-1">Requires hospital review</div>
                    </div>
                  </div>
                  <div className="mt-5 text-sm text-slate-600 leading-relaxed">
                    ShadowDoctor has flagged this signal based on hospital reporting trends, regional activity, and environmental factors.
                  </div>
                  <button
                    className="btn-primary mt-6"
                    onClick={() => navigate(`/hospital/alerts/${topAlert.id}`)}
                  >
                    Review alert <ChevronRight size={15} />
                  </button>
                </div>

                <div className="grid gap-4">
                  {regionalSummary.map((region) => (
                    <div key={region.region} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm text-slate-500">{region.region}</div>
                          <div className="text-xl font-semibold text-slate-900">{region.risk}%</div>
                        </div>
                        <RiskBadge level={region.risk > 75 ? "High" : region.risk > 45 ? "Medium" : "Low"} />
                      </div>
                      <p className="mt-4 text-sm text-slate-600">Regional risk compared to historical baseline and nearby hospitals.</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                <p className="text-sm font-medium">No active early warning alerts for your hospital.</p>
                <p className="mt-3 text-sm">Continue submitting daily surveillance data to keep the signal current.</p>
              </div>
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Why this region is flagged</p>
                  <h2 className="text-xl font-semibold text-slate-900 mt-2">Key contributing signals</h2>
                </div>
                <span className="text-sm font-semibold text-slate-600">{topAlert ? topAlert.window : "No alert"}</span>
              </div>
              <div className="space-y-4">
                {["Recent disease activity", "Hospital admissions", "Regional activity", "Rainfall", "Humidity"].map((label, index) => {
                  const level = [90, 78, 64, 55, 48][index];
                  const status = index < 3 ? "High" : "Moderate";
                  return (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-700">
                        <span>{label}</span>
                        <span className="font-semibold text-slate-900">{status}</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${level}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Recent data submission</p>
                  <h2 className="text-xl font-semibold text-slate-900 mt-2">Submission health</h2>
                </div>
                <Users className="text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Latest upload</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{currentHospital?.lastActivity}</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Expected completion</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{currentHospital?.completeness ?? 0}%</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Next submission due</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">Tomorrow, 9:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

function Row({ label, value, first }) {
  return (
    <div className={"flex justify-between py-2.5 text-[13px] " + (first ? "" : "border-t border-line")}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
