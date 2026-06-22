import { Link } from 'react-router-dom';
import { Logo } from './Logo';

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.9c-.8.4-1.6.6-2.5.8.9-.6 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1A4 4 0 0012 8.5c0 .3 0 .6.1.9-3.2-.2-6-1.7-7.9-4.1-.3.6-.5 1.3-.5 2 0 1.4.7 2.6 1.8 3.3-.6 0-1.3-.2-1.8-.5 0 2 1.4 3.6 3.2 4-.6.2-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.7A8 8 0 012 19.5 11.3 11.3 0 008 21c7 0 10.8-5.8 10.8-10.9v-.5c.8-.5 1.4-1.2 1.9-2z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="8" y1="10" x2="8" y2="17" />
      <line x1="8" y1="7" x2="8" y2="7" />
      <path d="M12 17v-4.5a2 2 0 014 0V17" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12">
          <div>
            <Logo />
            <p className="text-text-dim text-sm mt-4 max-w-xs leading-relaxed">
              The marketplace connecting clients with verified photographers, videographers and
              licensed drone operators — gear-first, no guesswork.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-faint font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-text-dim">
              <li><Link to="/" className="hover:text-signal transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-signal transition-colors">Dashboard</Link></li>
              <li><Link to="/register" className="hover:text-signal transition-colors">Become a Creator</Link></li>
              <li><Link to="/signup" className="hover:text-signal transition-colors">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-faint font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-text-dim">
              <li><Link to="/help" className="hover:text-signal transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-signal transition-colors">Support</Link></li>
              <li><Link to="/terms" className="hover:text-signal transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-signal transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-faint font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-text-dim">
              <li><Link to="/support" className="hover:text-signal transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-signal transition-colors">FAQs</Link></li>
              <li><Link to="/login" className="hover:text-signal transition-colors">Log In</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-text-faint text-xs">
            Developed by{' '}
            <a href="mailto:jaydeveloper010@gmail.com" className="text-signal hover:text-signal-bright">
              jaydeveloper010@gmail.com
            </a>
            <span className="mx-2 text-line">&middot;</span>
            <a href="#" className="text-signal hover:text-signal-bright">@beru</a>
          </p>
          <div className="flex items-center gap-3">
            {[InstagramIcon, TwitterIcon, LinkedinIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-8 w-8 rounded-full border border-line flex items-center justify-center text-text-dim hover:border-signal hover:text-signal transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
