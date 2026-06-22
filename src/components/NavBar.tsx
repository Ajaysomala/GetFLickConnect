import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Become a Creator' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/support', label: 'Support' },
  { to: '/help', label: 'Help' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-line-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-signal' : 'text-text-dim hover:text-text'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-text-dim hover:text-text px-4 py-2.5">
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold bg-signal text-ink px-5 py-2.5 rounded-full hover:bg-signal-bright transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button className="lg:hidden text-text" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden mt-4 px-6 flex flex-col gap-1 pb-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 text-sm border-b border-line-soft ${isActive ? 'text-signal' : 'text-text-dim'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 mt-4">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm border border-line rounded-full">
              Log in
            </Link>
            <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm bg-signal text-ink rounded-full font-semibold">
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
