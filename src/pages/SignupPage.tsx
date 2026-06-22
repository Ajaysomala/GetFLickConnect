import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Aperture } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Filmstrip } from '../components/Filmstrip';
import { useStore } from '../lib/store';

export function SignupPage() {
  const navigate = useNavigate();
  const { creators } = useStore();
  const [accountType, setAccountType] = useState<'client' | 'creator'>('client');
  const allPhotos = creators.flatMap((c) => c.photos.slice(2, 4));

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-ink overflow-hidden">
      <div className="relative hidden lg:flex items-center justify-center border-r border-line overflow-hidden h-screen">
        <Filmstrip photos={allPhotos.slice(0, 5)} orientation="vertical" className="absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative z-10 text-center px-12">
          <div className="h-16 w-16 rounded-full border border-signal/50 flex items-center justify-center mx-auto mb-6 bg-ink shadow-xl">
            <Aperture size={26} className="text-signal" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3 leading-tight drop-shadow-lg">Start with the<br />right setup.</h2>
          <p className="text-text-dim text-sm max-w-xs mx-auto bg-ink/40 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            One account, two sides — book a creator or get booked yourself.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <Logo className="mb-12" />
          <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-text-dim text-sm mb-8">Book trusted creators for your next shoot, or list your own services.</p>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setAccountType('client')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                accountType === 'client' ? 'bg-signal/10 border-signal text-signal-bright' : 'border-line text-text-dim'
              }`}
            >
              I'm a Client
            </button>
            <button
              onClick={() => setAccountType('creator')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                accountType === 'creator' ? 'bg-signal/10 border-signal text-signal-bright' : 'border-line text-text-dim'
              }`}
            >
              I'm a Creator
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(accountType === 'creator' ? '/register' : '/dashboard');
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-text-dim mb-2">Full name</label>
              <input required placeholder="Jordan Patel" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-signal transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dim mb-2">Email address</label>
              <input type="email" required placeholder="you@example.com" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-signal transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dim mb-2">Password</label>
              <input type="password" required placeholder="At least 8 characters" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-signal transition-colors" />
              <p className="text-xs text-text-faint mt-2">Use 8+ characters with a mix of letters and numbers.</p>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-text-dim">
              <input type="checkbox" required className="accent-signal mt-0.5" />
              I agree to the <Link to="/terms" className="text-signal hover:text-signal-bright">Terms & Conditions</Link>
            </label>
            <button type="submit" className="w-full bg-signal text-ink font-semibold py-3.5 rounded-full hover:bg-signal-bright transition-colors">
              {accountType === 'creator' ? 'Continue to Creator Setup' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-text-dim mt-8">
            Already have an account? <Link to="/login" className="text-signal font-semibold hover:text-signal-bright">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
