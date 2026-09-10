import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { getPublishedArticles } from '@/lib/public-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getPublishedArticles()).find((item) => item.slug === slug);
  return { title: article?.title ?? 'Intelligence report', description: article?.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = (await getPublishedArticles()).find((item) => item.slug === slug);
  if (!article) return <main className="not-found"><h1>REPORT NOT FOUND</h1><Link href="/news">Return to intelligence</Link></main>;
  return <PageShell><main className="detail-page"><article className="article-detail"><Link className="back-link" href="/news"><ArrowLeft size={14} /> All intelligence</Link><p className="eyebrow">FILED // {article.category}</p><h1>{article.title}</h1><p className="lead">{article.summary}</p><div className="article-byline"><span>{article.date}</span><span>Filed by {article.author}</span><span>{article.category}</span></div><div className="article-body">{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article></main></PageShell>;
}
