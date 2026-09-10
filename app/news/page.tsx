import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { getPublishedArticles } from '@/lib/public-data';

export const metadata: Metadata = { title: 'Intelligence', description: 'Latest news, releases and field notes from The Myriad.' };

export default async function NewsPage() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured.slug);
  return (
    <PageShell>
      <main><section className="page-hero"><div className="page-title"><p className="eyebrow">INCOMING // VERIFIED</p><h1>Intelligence</h1><p>Release reports, field notes and transmissions from inside The Myriad.</p></div><span className="page-code">CHANNEL / OPEN SOURCE</span></section>
        <section className="news-page">
          <Link className="featured-article" href={'/news/' + featured.slug}><div className="featured-visual" /><div className="featured-article-copy"><span className="status-label">Priority report</span><p className="article-meta">{featured.date + ' // ' + featured.category}</p><h2>{featured.title}</h2><p>{featured.summary}</p><span className="text-link">Read report <ArrowRight size={16} /></span></div></Link>
          <div className="news-cards">{rest.map((article) => <Link className="news-card" href={'/news/' + article.slug} key={article.slug}><p className="article-meta">{article.date + ' // ' + article.category}</p><h2>{article.title}</h2><p>{article.summary}</p><ArrowRight /></Link>)}</div>
        </section>
      </main>
    </PageShell>
  );
}
