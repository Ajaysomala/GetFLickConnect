import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, User, Phone, Eye, EyeOff, ShieldCheck, ChevronLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useStore } from '../lib/store';

type Step = 'info' | 'otp' | 'done';

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handle = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...value]; next[i] = val; onChange(next);
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
    refs.current[Math.min(digits.length, 5)]?.focus();
  };
  return (
    <div className="flex gap-3 justify-center">
      {value.map((digit, i) => (
        <input key={i} ref={el => { refs.current[i] = el; }}
          type="text" inputMode="numeric" maxLength={1} value={digit}
          onChange={e => handle(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)} onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200"
          style={{
            background: 'rgba(10,16,32,.9)',
            borderColor: digit ? 'rgba(99,179,237,.7)' : 'rgba(99,179,237,.18)',
            color: '#E8F4FF',
            boxShadow: digit ? '0 0 0 3px rgba(99,179,237,.12)' : 'none',
          }} />
      ))}
    </div>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  const { setAuthUser, addCreator } = useStore();

  const [accountType, setAccountType] = useState<'client' | 'creator'>('creator');
  const [step, setStep] = useState<Step>('info');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Enter a valid phone number'); return; }
    setLoading(true);
    // TODO: POST /api/auth/register  { name, email, phone, password, role: accountType }
    // TODO: Response sends OTP to phone
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp.join('').length < 6) { setError('Enter all 6 digits'); return; }
    setLoading(true);
    // TODO: POST /api/auth/verify-otp  { phone: form.phone, code: otp.join('') }
    // TODO: On success, store JWT and user profile from response
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    const userId = 'user-' + Date.now();
    setAuthUser({ id: userId, name: form.name, email: form.email, phone: form.phone, role: accountType });
    if (accountType === 'creator') {
      // Scaffold empty creator profile — will be filled in /register
      addCreator({
        id: userId, name: form.name,
        avatarInitials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        avatarColor: '#3B82F6',
        location: '', yearsExperience: 0, bio: '', services: 'Photographer',
        specialties: [], certifications: [], gear: { bodies: [], lenses: [], audioLighting: [] },
        hasDrone: false, isPart107Certified: false, hourlyRate: 0,
        reelTitle: '', reelId: '', photos: [], isAvailable: false,
        rating: 0, reviewCount: 0, totalEarnings: 0, profileViews: 0,
        bookings: [], reviews: [],
        joinedDate: new Date().toISOString().split('T')[0],
        phone: form.phone, email: form.email,
      });
      navigate('/register');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>
      {/* Left panel */}
      <div className="relative hidden lg:flex flex-col items-center justify-center w-1/2 overflow-hidden border-r border-line">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-grid" />
          <div className="scan-line" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/10" />
        </div>
        <div className="relative z-10 text-center px-16 animate-fade-up">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 pulse-ring"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)', boxShadow: '0 16px 40px rgba(99,179,237,.35)' }}>
            <Camera size={32} className="text-white" />
          </div>
          <h2 className="font-display text-4xl font-black mb-4 leading-tight">
            One platform.<br /><span className="text-shimmer">Two sides.</span>
          </h2>
          <p className="text-text-dim text-sm max-w-xs mx-auto leading-relaxed">
            Book a verified creator for your next shoot, or list your services and get hired.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 float-badge">
            {[
              { icon: '📸', title: 'Client', desc: 'Find & book verified photographers' },
              { icon: '🎬', title: 'Creator', desc: 'Get discovered. Get hired. Get paid.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-panel p-5 text-left">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-semibold text-sm mb-1">{title}</div>
                <div className="text-text-faint text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 overflow-y-auto">
        <div className="w-full max-w-md animate-fade-up">
          <Logo className="mb-10" />

          {step === 'info' && (
            <>
              <h1 className="font-display text-3xl font-black mb-2">Create your account</h1>
              <p className="text-text-dim text-sm mb-8">Join as a client or as a creator.</p>

              <div className="flex gap-3 mb-8">
                {(['client', 'creator'] as const).map(type => (
                  <button key={type} onClick={() => setAccountType(type)}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all"
                    style={{
                      borderColor: accountType === type ? 'rgba(99,179,237,.7)' : 'rgba(99,179,237,.14)',
                      background: accountType === type ? 'rgba(99,179,237,.12)' : 'transparent',
                      color: accountType === type ? '#4FD1C5' : '#7BA8CC',
                    }}>
                    {type === 'client' ? <><User size={14} className="inline mr-1.5" />I'm a Client</> : <><Camera size={14} className="inline mr-1.5" />I'm a Creator</>}
                  </button>
                ))}
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Full name</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Jordan Patel" className="w-full rounded-xl px-4 py-3.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Email address</label>
                  <input type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" className="w-full rounded-xl px-4 py-3.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Phone number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                    <input type="tel" required value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" className="w-full rounded-xl px-4 py-3.5 text-sm pl-11" />
                  </div>
                  <p className="text-xs text-text-faint mt-1.5">We'll verify this number with an OTP.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={set('password')} placeholder="At least 8 characters" className="w-full rounded-xl px-4 py-3.5 text-sm pr-12" />
                    <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint hover:text-text">
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Confirm password</label>
                  <input type="password" required value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Repeat password" className="w-full rounded-xl px-4 py-3.5 text-sm" />
                </div>
                <label className="flex items-start gap-2.5 text-sm text-text-dim">
                  <input type="checkbox" required className="accent-signal mt-0.5" />
                  I agree to the <Link to="/terms" className="text-signal hover:text-signal-bright">Terms & Conditions</Link>
                </label>
                {error && <p className="text-danger text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-signal text-ink font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Creating account…' : <><span>Continue</span><ArrowRight size={16} /></>}
                </button>
              </form>
              <p className="text-center text-sm text-text-dim mt-8">
                Already have an account? <Link to="/login" className="text-signal font-semibold hover:text-signal-bright">Log in</Link>
              </p>
            </>
          )}

          {step === 'otp' && (
            <>
              <button onClick={() => setStep('info')} className="flex items-center gap-1 text-text-faint text-sm mb-8 hover:text-text transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(99,179,237,.12)', border: '1px solid rgba(99,179,237,.2)' }}>
                <ShieldCheck size={22} className="text-signal" />
              </div>
              <h1 className="font-display text-3xl font-black mb-2">Verify your number</h1>
              <p className="text-text-dim text-sm mb-10">
                We sent a 6-digit code to <span className="text-text font-semibold">{form.phone}</span>
              </p>
              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <OtpInput value={otp} onChange={setOtp} />
                {error && <p className="text-danger text-sm text-center">{error}</p>}
                <button type="submit" disabled={loading || otp.join('').length < 6}
                  className="w-full bg-signal text-ink font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Verifying…' : <><span>Verify & Continue</span><ShieldCheck size={16} /></>}
                </button>
              </form>
              <p className="text-center text-sm text-text-dim mt-6">
                Didn't get it? <button onClick={() => {}} className="text-signal hover:text-signal-bright font-semibold">Resend OTP</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}