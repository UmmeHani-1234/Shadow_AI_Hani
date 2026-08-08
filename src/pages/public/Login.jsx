import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, ArrowLeft, Building2, ChevronRight, ShieldCheck, Eye, EyeOff, Globe2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { hospitals, loginAsHospital, loginAsAdmin } = useAuth();
  const [role, setRole] = useState("Hospital");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [hospitalId, setHospitalId] = useState(hospitals[0]?.id || "");
  const navigate = useNavigate();

  function handleSignIn() {
    if (role === "Hospital") {
      if (!hospitalId) return;
      loginAsHospital(hospitalId);
      navigate("/hospital");
    } else {
      loginAsAdmin();
      navigate("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-login-page text-ink py-8">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-center scale-x-[1.1] scale-y-[0.95] origin-top">
        <div className="relative hidden min-h-[760px] w-full max-w-[560px] overflow-hidden rounded-[36px] bg-gradient-to-br from-brand to-brand-dark px-8 py-10 text-white shadow-[0_40px_120px_rgba(124,58,237,0.18)] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute right-[-80px] top-20 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-[-60px] bottom-24 h-40 w-40 rounded-full bg-slate-100/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_38%)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-3 shadow-soft">
              <span className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-soft">
                <Activity size={18} />
              </span>
              <div>
                <div className="text-[17px] font-semibold">AttendSmart</div>
                <p className="text-[13px] text-white/80">Smart Attendance System</p>
              </div>
            </div>

            <div className="mt-14 max-w-[360px] space-y-4">
              <h1 className="font-display text-[36px] leading-tight">Attendance intelligence for modern campuses.</h1>
              <p className="text-[15px] text-white/80 leading-relaxed">
                Turn daily attendance into actionable insights, simplified workflows, and campus-wide confidence.
              </p>
            </div>

            <div className="mt-10 rounded-[28px] border border-white/20 bg-white/10 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-[13px] uppercase tracking-[0.24em] text-white/80">Smarter attendance</p>
              <p className="mt-3 text-[16px] font-semibold leading-snug">Smarter attendance. Simpler management.</p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 pt-6">
            <div className="rounded-[24px] bg-white/10 p-4 shadow-soft backdrop-blur-xl">
              <div className="flex items-center justify-between text-[14px] text-white/80">
                <span>Daily check-ins</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">Live</span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-[28px] font-semibold">98%</span>
                <span className="text-[13px] text-white/70">on-time attendance</span>
              </div>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 shadow-soft backdrop-blur-xl">
              <div className="flex items-center justify-between text-[14px] text-white/80">
                <span>Alerts sent</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">AI</span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-[28px] font-semibold">24</span>
                <span className="text-[13px] text-white/70">today</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-10">
            <div className="h-20 rounded-[28px] border border-white/10 bg-white/5 p-4 text-[13px] text-white/75">
              <div className="font-semibold">Pro tip</div>
              <p className="mt-2 leading-relaxed">Keep your campus safe by reviewing attendance anomalies before they become patterns.</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[36px] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:max-w-[540px] lg:p-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-brand">Welcome back</p>
              <h1 className="font-display text-[32px] font-semibold mt-4">Sign in to your account</h1>
            </div>
            <Link to="/" className="text-[13px] font-medium text-brand hover:text-brand-dark">Back to home</Link>
          </div>

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm">
            {[
              { key: "Hospital", icon: Building2 },
              { key: "Admin", icon: ShieldCheck },
            ].map((option) => {
              const active = role === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setRole(option.key)}
                  className={
                    "flex flex-1 items-center justify-center gap-2 rounded-[24px] px-5 py-4 text-[14px] transition " +
                    (active
                      ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-soft"
                      : "bg-white text-secondary shadow-none")
                  }
                >
                  <option.icon size={18} />
                  {option.key}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-5">
            <label className="field-label">
              <span>Username / Email</span>
              <input
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                type="email"
              />
            </label>

            <label className="field-label relative">
              <span>Password</span>
              <input
                className="field-input pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[52px] inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-secondary transition hover:bg-slate-50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-[14px] text-secondary">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-line text-brand focus:ring-brand"
                />
                Remember me
              </label>
              <button type="button" className="text-[14px] font-medium text-brand hover:text-brand-dark">Forgot password?</button>
            </div>

            <button
              type="button"
              onClick={handleSignIn}
              className="btn-primary btn-lg w-full justify-center mt-2"
            >
              Sign In →
            </button>

            <div className="flex items-center gap-3 text-[13px] text-muted">
              <span className="h-px flex-1 bg-slate-200" />
              <span>Or continue with</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-[15px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Globe2 size={18} />
              Sign in with Google
            </button>
          </div>

          <div className="mt-8 text-center text-[14px] text-secondary">
            Don’t have an account? <Link to="/register" className="font-semibold text-brand hover:text-brand-dark">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
