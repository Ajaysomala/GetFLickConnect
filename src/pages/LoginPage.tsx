import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Camera } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Filmstrip } from '../components/Filmstrip';
import { useStore } from '../lib/store';

export function LoginPage() {
  const navigate = useNavigate();
  const { creators } = useStore();
  const [showPw, setShowPw] = useState(false);
  const allPhotos = creators.flatMap((c) => c.photos.slice(0, 2));

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-ink overflow-hidden">
      <div className="relative hidden lg:flex items-center justify-center border-r border-line overflow-hidden h-screen">
        <Filmstrip photos={allPhotos.slice(0, 5)} orientation="vertical" className="absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative z-10 text-center px-12">
          <div className="h-16 w-16 rounded-full border border-signal/50 flex items-center justify-center mx-auto mb-6 bg-ink shadow-xl">
            <Camera size={26} className="text-signal" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3 leading-tight drop-shadow-lg">Every booking,<br />in focus.</h2>
          <p className="text-text-dim text-sm max-w-xs mx-auto bg-ink/40 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            Verified gear. Verified pilots. No surprises on shoot day.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <Logo className="mb-12" />
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-text-dim text-sm mb-10">Log in to manage bookings, browse creators, or check your dashboard.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-text-dim mb-2">Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-signal transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dim mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-signal transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint hover:text-text"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-dim">
                <input type="checkbox" className="accent-signal" /> Remember me
              </label>
              <a href="#" className="text-signal hover:text-signal-bright">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-signal text-ink font-semibold py-3.5 rounded-full hover:bg-signal-bright transition-colors">
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-text-dim mt-8">
            Don't have an account? <Link to="/signup" className="text-signal font-semibold hover:text-signal-bright">Create one</Link>
          </p>
          <p className="text-center text-xs text-text-faint mt-3">
            Are you a creator? <Link to="/register" className="text-signal hover:text-signal-bright">Register your services</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
