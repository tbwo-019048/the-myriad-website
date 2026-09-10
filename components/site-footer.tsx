import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { getGlobalContent } from '@/lib/public-data';

export async function SiteFooter() {
  const siteSettings = await getGlobalContent();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <BrandMark />
        <p>Operations. Agents. Enemies. Conspiracies. Global consequences.</p>
        <a
          className="footer-shadow"
          href={siteSettings.shadowverse.url}
          target="_blank"
          rel="noreferrer"
        >
          <small>{siteSettings.shadowverse.supportingText}</small>
          {siteSettings.shadowverse.label} <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-grid">
        <nav aria-label="Footer navigation">
          <Link href="/books">Books</Link>
          <Link href="/characters">Characters</Link>
          <Link href="/news">News</Link>
          <Link href="/about">About Toby</Link>
          <Link href="/store">Store</Link>
        </nav>
        <div className="footer-socials">
          {siteSettings.socialLinks.map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
        <div className="footer-meta">
          <span>© 2026 Toby Crome</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/admin">Admin login</Link>
        </div>
      </div>
    </footer>
  );
}
