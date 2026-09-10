import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BookCover } from '@/components/book-cover';
import { PageShell } from '@/components/page-shell';
import { getPublishedBooks, getPublishedSeries } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Explore The Myriad Files, the international espionage thriller series by Toby Crome.',
};

export default async function BooksPage() {
  const [books, series] = await Promise.all([getPublishedBooks(), getPublishedSeries()]);
  const collection = series[0];
  return (
    <PageShell>
      <main>
        <section className="page-hero">
          <div className="page-title"><p className="eyebrow">ARCHIVE // OPEN</p><h1>The Files</h1><p>Every operation begins with incomplete intelligence. Discover The Myriad Files in mission order.</p></div>
          <span className="page-code">INDEX / SERIES / 001</span>
        </section>
        {collection && <section className="series-intro content-section">
          <div><p className="kicker">FILE GROUP // ACTIVE</p><h2>{collection.name}</h2><p className="lead">{collection.description}</p><blockquote>“{collection.quote}”</blockquote></div>
          <dl className="series-facts"><div><dt>Books</dt><dd>{books.length} records</dd></div><div><dt>Status</dt><dd>{collection.status}</dd></div><div><dt>Territory</dt><dd>International</dd></div><div><dt>Lead asset</dt><dd>G. Wolfe</dd></div></dl>
        </section>}
        <section className="book-sequence">
          {books.map((book) => (
            <article className="book-entry" key={book.slug}>
              <div className="book-cover-wrap"><BookCover title={book.title} className={book.coverClass} number={book.position} /></div>
              <div className="book-entry-copy">
                <span className={'status-label ' + (book.status === 'Released' ? 'released' : '')}>{book.status + ' // ' + book.releaseLabel}</span>
                <p className="kicker">{'FILE 0' + book.position + ' // ' + book.series}</p>
                <h2>{book.title}</h2>
                <p className="lead">{book.shortDescription}</p>
                <blockquote>“{book.quote}”</blockquote>
                <Link className="text-link" href={'/books/' + book.slug}>Open full file <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
