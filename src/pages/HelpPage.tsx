import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

interface FaqItem {
  q: string;
  a: string;
  link?: { to: string; label: string };
}

const CLIENT_FAQ: FaqItem[] = [
  { q: 'How do I book a creator?', a: 'Browse profiles on the discovery feed, filter by service type, budget, and drone certification, then open a profile and tap "Book Now" to confirm a date and pay securely.' },
  { q: "Can I see a creator's actual gear before booking?", a: 'Yes. Every profile lists verified camera bodies, lenses, audio/lighting kit, and drone certification status under "Gear & Tech Specs."' },
  { q: 'What if I need to reschedule?', a: 'Open your booking and select "Request reschedule" up to 48 hours before the shoot. The creator will confirm a new date or offer alternatives.' },
  { q: 'How are creators verified?', a: 'We confirm identity, review submitted portfolio work, and check Part 107 documentation for any creator offering drone services before their profile goes live.' },
  { q: 'What payment methods are accepted?', a: 'Major credit and debit cards, plus Apple Pay and Google Pay at checkout.' },
];

const CREATOR_FAQ: FaqItem[] = [
  { q: 'How do I register my services?', a: 'Head to the Become a Creator page and complete the five-step form covering your profile, services, gear, drone status, and portfolio.', link: { to: '/register', label: 'Become a Creator' } },
  { q: 'How does the Part 107 badge work?', a: 'If you mark yourself as Part 107 certified during registration, your profile gets a verified drone badge and becomes visible to clients filtering for "Must have Drone License."' },
  { q: 'When do I get paid?', a: 'Earnings are released to your linked payout account 48 hours after a booking is marked complete, and you can track them in real time from your dashboard.' },
  { q: 'Can I update my gear list or rate later?', a: 'Yes, anytime from your dashboard under "My Portfolio." Changes reflect on your public profile immediately.' },
  { q: 'How do I toggle my availability?', a: 'Use the "Available for hire" switch at the top of your dashboard. Turning it off hides you from new client searches without affecting existing bookings.' },
];

function FaqList({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="divide-y divide-line">
      {items.map((item, i) => (
        <div key={item.q} className="py-5">
          <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left">
            <h4 className="font-semibold text-sm">{item.q}</h4>
            <Plus size={16} className={`flex-shrink-0 text-text-faint transition-transform ${openIdx === i ? 'rotate-45 text-signal' : ''}`} />
          </button>
          {openIdx === i && (
            <p className="text-text-dim text-sm mt-3 leading-relaxed">
              {item.a}{' '}
              {item.link && (
                <Link to={item.link.to} className="text-signal hover:text-signal-bright">{item.link.label}</Link>
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      <section className="pt-32 pb-12 border-b border-line">
        <div className="max-w-5xl mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Help center</div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Answers, organized by who you are.</h1>
          <p className="text-text-dim max-w-xl">Browse guides for clients booking a shoot or creators managing their profile.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 mb-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-5">For Clients</div>
              <FaqList items={CLIENT_FAQ} />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-5">For Creators</div>
              <FaqList items={CREATOR_FAQ} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-panel p-12 text-center">
            <h3 className="font-display text-xl font-bold mb-2">Still stuck?</h3>
            <p className="text-text-dim text-sm mb-6">Our support team can help with anything not covered here.</p>
            <Link to="/support" className="inline-block bg-signal text-ink font-semibold px-7 py-3 rounded-full hover:bg-signal-bright transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
