import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useStore } from '../lib/store';

type Step = 'phone' | 'otp' | 'password';

function CinematicBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="hero-grid opacity-100" />
      <div className="scan-line" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/10" />
    </div>
  );
}

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handle = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...value];
    next[i] = val;
    onChange(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = Array(6).fill('');
    digits.forEach((d, i) => { next[i] = d; });
    onChange(next);
    const focusIdx = Math.min(digits.length, 5);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200"
          style={{
            background: 'rgba(10,16,32,.9)',
            borderColor: digit ? 'rgba(99,179,237,.7)' : 'rgba(99,179,237,.18)',
            color: '#E8F4FF',
            boxShadow: digit ? '0 0 0 3px rgba(99,179,237,.12)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuthUser } = useStore();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (phone.replace(/\D/g, '').length < 10) { setError('Enter a valid phone number'); return; }
    setLoading(true);
    // TODO: POST /api/auth/send-otp  { phone }
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSentTo(phone);
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) { setError('Enter all 6 digits'); return; }
    setLoading(true);
    // TODO: POST /api/auth/verify-otp  { phone, code }
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setStep('password');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Enter your password'); return; }
    setLoading(true);
    // TODO: POST /api/auth/login  { phone, otp: otp.join(''), password }
    // TODO: Store JWT from response, hydrate creators list
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setAuthUser({ id: 'user-' + Date.now(), name: 'User', email: '', phone, role: 'creator' });
    navigate('/dashboard');
  };

  const resendOtp = async () => {
    setOtp(Array(6).fill(''));
    setError('');
    setLoading(true);
    // TODO: POST /api/auth/resend-otp  { phone }
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>
      {/* Left Panel */}
      <div className="relative hidden lg:flex flex-col items-center justify-center w-1/2 overflow-hidden border-r border-line">
        <CinematicBg />
        <div className="relative z-10 text-center px-16 animate-fade-up">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 pulse-ring"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 16px 40px rgba(99,179,237,.35)' }}
          >
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="font-display text-4xl font-black mb-4 leading-tight">
            Every booking,<br />
            <span className="text-shimmer">in focus.</span>
          </h2>
          <p className="text-text-dim text-sm max-w-xs mx-auto leading-relaxed">
            Verified gear. Verified pilots. No surprises on shoot day.
          </p>
          <div className="mt-12 flex flex-col gap-3 text-left float-badge">
            {[
              ['2,400+', 'Verified creators on platform'],
              ['18,900', 'Shoots booked successfully'],
              ['4.9 / 5', 'Average client rating'],
            ].map(([n, l]) => (
              <div key={l} className="flex items-center gap-4 glass-panel px-5 py-3">
                <span className="font-display font-bold text-signal text-lg">{n}</span>
                <span className="text-text-dim text-xs">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 overflow-y-auto">
        <div className="w-full max-w-md animate-fade-up">
          <Logo className="mb-10" />

          {step === 'phone' && (
            <>
              <h1 className="font-display text-3xl font-black mb-2">Welcome back</h1>
              <p className="text-text-dim text-sm mb-10">Enter your phone number to receive a verification code.</p>
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Phone number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl px-4 py-3.5 text-sm pl-11"
                    />
                  </div>
                  <p className="text-xs text-text-faint mt-2">We'll send a 6-digit OTP to this number.</p>
                </div>
                {error && <p className="text-danger text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-signal text-ink font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Sending OTP…' : <><span>Send OTP</span> <ArrowRight size={16} /></>}
                </button>
              </form>
              <p className="text-center text-sm text-text-dim mt-8">
                No account? <Link to="/signup" className="text-signal font-semibold hover:text-signal-bright">Create one</Link>
              </p>
            </>
          )}

          {step === 'otp' && (
            <>
              <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-text-faint text-sm mb-8 hover:text-text transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <h1 className="font-display text-3xl font-black mb-2">Check your phone</h1>
              <p className="text-text-dim text-sm mb-10">
                We sent a 6-digit code to <span className="text-text font-semibold">{sentTo}</span>
              </p>
              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <OtpInput value={otp} onChange={setOtp} />
                {error && <p className="text-danger text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || otp.join('').length < 6}
                  className="w-full bg-signal text-ink font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Verifying…' : <><span>Verify Code</span> <ShieldCheck size={16} /></>}
                </button>
              </form>
              <p className="text-center text-sm text-text-dim mt-6">
                Didn't get it?{' '}
                <button onClick={resendOtp} className="text-signal hover:text-signal-bright font-semibold">
                  Resend OTP
                </button>
              </p>
            </>
          )}

          {step === 'password' && (
            <>
              <button onClick={() => setStep('otp')} className="flex items-center gap-1 text-text-faint text-sm mb-8 hover:text-text transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <div className="w-12 h-12 rounded-xl bg-ok/10 flex items-center justify-center mb-6">
                <ShieldCheck size={22} className="text-ok" />
              </div>
              <h1 className="font-display text-3xl font-black mb-2">Number verified</h1>
              <p className="text-text-dim text-sm mb-10">Enter your password to complete sign-in.</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="w-full rounded-xl px-4 py-3.5 text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint hover:text-text"
                    >
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-signal text-sm hover:text-signal-bright">Forgot password?</a>
                </div>
                {error && <p className="text-danger text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-signal text-ink font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Signing in…' : <><span>Sign In</span> <ArrowRight size={16} /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}