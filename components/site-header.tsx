import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { getGlobalContent } from '@/lib/public-data';

const nav = [
  ['Home', '/'],
  ['Books', '/books'],
  ['Characters', '/characters'],
  ['News', '/news'],
  ['About Toby', '/about'],
  ['Store', '/store'],
];

export async function SiteHeader() {
  const siteSettings = await getGlobalContent();
  return (
    <header className="site-header">
      <Link href="/" className="logo-link" aria-label="The Myriad home">
        <BrandMark compact />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      {siteSettings.shadowverse.enabled && (
        <a
          className="shadow-link"
          href={siteSettings.shadowverse.url}
          target={siteSettings.shadowverse.openInNewTab ? '_blank' : undefined}
          rel="noreferrer"
        >
          Shadowverse <ArrowUpRight size={14} />
        </a>
      )}
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          <span />
          <span />
        </summary>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href], index) => (
            <Link key={href} href={href}>
              <em>0{index + 1}</em> {label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
