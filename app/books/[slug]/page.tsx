import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BookCover } from '@/components/book-cover';
import { PageShell } from '@/components/page-shell';
import { getPublishedBooks } from '@/lib/public-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = (await getPublishedBooks()).find((item) => item.slug === slug);
  return { title: book?.title ?? 'Book', description: book?.shortDescription };
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = (await getPublishedBooks()).find((item) => item.slug === slug);
  if (!book) return <main className="not-found"><h1>FILE NOT FOUND</h1><Link href="/books">Return to archive</Link></main>;
  return (
    <PageShell>
      <main className="detail-page">
        <Link className="back-link" href="/books"><ArrowLeft size={14} /> Back to the files</Link>
        <div className="detail-layout">
          <BookCover title={book.title} className={book.coverClass} number={book.position} />
          <article className="detail-copy">
            <p className="eyebrow">MISSION FILE // 0{book.position}</p>
            <h1>{book.title}</h1>
            <p className="lead">{book.shortDescription}</p>
            <dl className="detail-meta">
              <div><dt>Series</dt><dd>{book.series} #{book.position}</dd></div>
              <div><dt>Release</dt><dd>{book.releaseLabel}</dd></div>
              <div><dt>Status</dt><dd>{book.status}</dd></div>
              {book.isbn && <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>}
            </dl>
            <div className="prose"><h2>Operation synopsis</h2><p>{book.synopsis}</p><blockquote>“{book.quote}”</blockquote>{book.endorsement && <p><strong>“{book.endorsement}”</strong><br />— {book.endorsementSource}</p>}</div>
            {book.purchaseLinks.length > 0 && <div className="purchase-links">{book.purchaseLinks.map((link) => <a className="button" href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label}<ArrowUpRight size={15} /></a>)}</div>}
          </article>
        </div>
      </main>
    </PageShell>
  );
}
