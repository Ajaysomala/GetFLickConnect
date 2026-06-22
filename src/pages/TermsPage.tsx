import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const SECTIONS = [
  { h: '1. Agreement to terms', p: 'These Terms & Conditions govern your access to and use of Get Flick Connect (the "Platform"), operated as a marketplace connecting clients seeking photography and videography services with independent photographers, videographers, and drone operators ("Creators"). By creating an account, you agree to be bound by these terms.' },
  { h: '2. Who can use the platform', p: 'You must be at least 18 years old to create an account. Creators offering drone services must hold a valid FAA Part 107 Remote Pilot Certificate (or local equivalent) where required by law, and are solely responsible for complying with applicable aviation regulations.' },
  { h: '3. Bookings and payments', list: [
    'All bookings are made directly between a client and a Creator through the Platform.',
    'Payments are held in escrow and released to the Creator 48 hours after a booking is marked complete, unless a dispute is filed.',
    'Cancellations made more than 48 hours before a scheduled shoot are eligible for a full refund. Cancellations within 48 hours may be subject to a partial cancellation fee.',
  ]},
  { h: '4. Creator responsibilities', p: 'Creators are independent contractors, not employees of Get Flick Connect. Creators are responsible for the accuracy of their listed gear, certifications, and availability, and for delivering work consistent with their portfolio and the agreed scope.' },
  { h: '5. Client responsibilities', p: 'Clients agree to provide accurate shoot details, grant reasonable access for the booked service, and communicate any changes to scope or location as early as possible.' },
  { h: '6. Content and intellectual property', p: 'Unless otherwise agreed in writing between client and Creator, the Creator retains copyright over captured footage and photographs. Clients receive a license to use delivered media for the purpose stated at booking. Portfolio samples uploaded by Creators must be their own original work.' },
  { h: '7. Prohibited conduct', p: 'Users may not misrepresent their identity, gear, or certifications; use the Platform to solicit business outside agreed booking terms in a way that circumvents platform fees; or upload content that is unlawful, infringing, or harmful.' },
  { h: '8. Limitation of liability', p: "Get Flick Connect provides the marketplace infrastructure and does not guarantee the quality of any specific shoot. To the maximum extent permitted by law, the Platform's liability is limited to the amount of fees paid for the relevant booking." },
  { h: '9. Changes to these terms', p: 'We may update these terms from time to time. Continued use of the Platform after changes take effect constitutes acceptance of the revised terms.' },
];

export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />
      <section className="pt-32 pb-12 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Legal</div>
          <h1 className="font-display text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-text-faint text-sm mb-10">Last updated: June 1, 2026</p>
          {SECTIONS.map((s) => (
            <div key={s.h} className="mb-10">
              <h2 className="font-display text-xl font-bold mb-3">{s.h}</h2>
              {s.p && <p className="text-text-dim text-sm leading-relaxed">{s.p}</p>}
              {s.list && (
                <ul className="space-y-2 mt-3">
                  {s.list.map((item) => (
                    <li key={item} className="text-text-dim text-sm leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-signal">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div>
            <h2 className="font-display text-xl font-bold mb-3">10. Contact</h2>
            <p className="text-text-dim text-sm">
              Questions about these terms can be sent to{' '}
              <a href="mailto:jaydeveloper010@gmail.com" className="text-signal hover:text-signal-bright">jaydeveloper010@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
