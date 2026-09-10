import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { about } from '@/lib/content';

export const metadata: Metadata = { title: 'About Toby Crome', description: 'Meet Toby Crome, author of The Myriad Files.' };

export default function AboutPage() {
  return <PageShell><main><section className="page-hero"><div className="page-title"><p className="eyebrow">AUTHOR FILE // TOBY CROME</p><h1>The author</h1><p>Stories about power, secrecy and the cost of knowing too much.</p></div><span className="page-code">FILE / PERSONAL / 001</span></section>
    <section className="about-grid"><figure className="author-visual" aria-label="Portrait placeholder for Toby Crome"><span>PORTRAIT // AUTHOR ARCHIVE</span></figure><div className="about-copy"><p className="kicker">TOBY CROME</p><h2>Writing in the shadows.</h2><p className="lead">{about.shortBio}</p><p>{about.fullBio}</p><blockquote>“{about.quote}”</blockquote></div></section>
    <section className="about-sections"><div className="about-block"><div><p className="kicker">ORIGIN // 001</p><h2>How The Myriad began</h2></div><p>{about.origin}</p></div><div className="about-block"><div><p className="kicker">INFLUENCE // 002</p><h2>Built from real pressure</h2></div><p>{about.influences}</p></div><div className="about-block"><div><p className="kicker">THE UNIVERSE // 003</p><h2>Intelligence has consequences</h2></div><p>The Myriad is an interconnected world of espionage, military operations and international conspiracy. Each novel follows a complete mission while revealing a deeper struggle over who controls information—and who pays when it is weaponised.</p></div></section>
  </main></PageShell>;
}
