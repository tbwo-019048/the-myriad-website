import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { BookCover } from '@/components/book-cover';
import { PageShell } from '@/components/page-shell';
import { getPublishedProducts } from '@/lib/public-data';

export const metadata: Metadata = { title: 'Store', description: 'Books, signed editions and limited Myriad releases.' };

export default async function StorePage() {
  const products = await getPublishedProducts();
  return <PageShell><main><section className="page-hero"><div className="page-title"><p className="eyebrow">QUARTERMASTER // AVAILABLE</p><h1>Store</h1><p>Books, signed editions and limited material from The Myriad archive.</p></div><span className="page-code">CATALOGUE / 2026</span></section>
    {products.length ? <section className="store-grid">{products.map((product, index) => <article className="store-card" key={product.name}><BookCover title={product.name} className={product.coverClass} number={index + 1} /><p className="kicker">{product.category + ' // ' + product.availability}</p><h2>{product.name}</h2><span>{product.subtitle}</span><p className="price">{product.price}</p><p>{product.description}</p><a className="button" href={product.purchaseUrl} target="_blank" rel="noreferrer">Purchase externally <ArrowUpRight size={15} /></a></article>)}</section> : <section className="not-found"><h1>NO STOCK ACTIVE</h1><p>Check back for new releases.</p></section>}
  </main></PageShell>;
}
