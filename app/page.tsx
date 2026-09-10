import Link from 'next/link';
import { ArrowDown, ArrowRight, Crosshair, Radio, ShieldCheck } from 'lucide-react';
import { BookCover } from '@/components/book-cover';
import { PageShell } from '@/components/page-shell';
import { getGlobalContent, getPublishedArticles, getPublishedBooks, getPublishedCharacters, getPublishedSeries } from '@/lib/public-data';

export default async function Home() {
  const [siteSettings, articles, books, characters, series] = await Promise.all([
    getGlobalContent(), getPublishedArticles(), getPublishedBooks(), getPublishedCharacters(), getPublishedSeries(),
  ]);
  const featured = books.find((book) => book.status === 'Coming Soon') ?? books[0];
  return (
    <PageShell>
      <main>
        <section className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-coords" aria-hidden="true">
            <span>51.5072° N</span>
            <span>00.1276° W</span>
          </div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" />{siteSettings.heroEyebrow}</div>
            <h1>{siteSettings.heroHeading}</h1>
            <p>{siteSettings.heroText}</p>
            <div className="hero-actions">
              {featured && (
                <Link className="button button-primary" href={'/books/' + featured.slug}>
                  Latest release <ArrowRight size={17} />
                </Link>
              )}
              <Link className="button button-ghost" href="/books">
                Explore the files
              </Link>
            </div>
          </div>
          <div className="hero-brief">
            <span>BRIEF // 001</span>
            <dl>
              <div><dt>Location</dt><dd>London, UK</dd></div>
              <div><dt>Threat level</dt><dd className="red">Critical</dd></div>
              <div><dt>Asset status</dt><dd>In the field</dd></div>
            </dl>
          </div>
          <a className="scroll-cue" href="#featured"><ArrowDown size={16} /> Scroll to declassify</a>
        </section>

        {featured && <section id="featured" className="featured-file content-section">
          <div className="section-marker">01 / FEATURED OPERATION</div>
          <div className="featured-cover-wrap reveal">
            <span className="file-stamp">COMING SOON</span>
            <BookCover title={featured.title} className={featured.coverClass} number={featured.position} />
          </div>
          <div className="featured-copy">
            <div className="eyebrow"><Radio size={14} />TRANSMISSION RECEIVED</div>
            <p className="kicker">{featured.series + ' // FILE 0' + featured.position}</p>
            <h2>{featured.title}</h2>
            <div className="release-line">
              <span>COMING SOON</span>
              <strong>{featured.releaseLabel}</strong>
            </div>
            <p className="lead">{featured.shortDescription}</p>
            <blockquote>“{featured.quote}”</blockquote>
            <Link className="text-link" href={'/books/' + featured.slug}>
              Open mission file <ArrowRight size={16} />
            </Link>
          </div>
          <aside className="file-index" aria-label="Featured book metadata">
            <span>MYR / 02</span>
            <Crosshair size={28} />
            <small>SECURITY CLASSIFICATION</small>
            <strong>RESTRICTED</strong>
          </aside>
        </section>}

        {series[0] && <section className="manifesto content-section">
          <div className="section-marker">02 / THE NETWORK</div>
          <p className="manifesto-index">ONE NETWORK<br />NO BORDERS</p>
          <div>
            <p className="kicker">{series[0].name}</p>
            <h2>The operation is larger than anyone knows.</h2>
            <p className="lead">{series[0].description}</p>
            <Link className="text-link" href="/books">Explore the series <ArrowRight size={16} /></Link>
          </div>
          <div className="network-graphic" aria-hidden="true">
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
            <span className="node node-d" />
            <svg viewBox="0 0 400 250"><path d="M32 200 L132 88 L238 154 L356 40 M132 88 L330 224 M238 154 L356 40" /></svg>
          </div>
        </section>}

        <section className="routes content-section">
          <div className="section-heading">
            <div><span className="section-marker">03 / ACCESS POINTS</span><h2>Enter the world</h2></div>
            <p>Four routes into an international conspiracy.</p>
          </div>
          <div className="route-grid">
            <Link href="/books" className="route-card route-books">
              <span>01</span><Crosshair /><div><small>THE FILES</small><h3>Books</h3><p>{books.length} active records</p></div><ArrowRight />
            </Link>
            <Link href="/characters" className="route-card">
              <span>02</span><ShieldCheck /><div><small>PERSONNEL</small><h3>Operatives</h3><p>{characters.length} profiles cleared</p></div><ArrowRight />
            </Link>
            <Link href="/news" className="route-card">
              <span>03</span><Radio /><div><small>INTELLIGENCE</small><h3>Reports</h3><p>Recent transmissions</p></div><ArrowRight />
            </Link>
            <Link href="/about" className="route-card">
              <span>04</span><div className="monogram">TC</div><div><small>AUTHOR FILE</small><h3>Toby Crome</h3><p>Origin and field notes</p></div><ArrowRight />
            </Link>
          </div>
        </section>

        <section className="news-strip content-section">
          <div className="section-heading">
            <div><span className="section-marker">04 / INCOMING</span><h2>{siteSettings.newsHeading}</h2></div>
            <Link className="text-link" href="/news">All reports <ArrowRight size={16} /></Link>
          </div>
          <div className="article-list">
            {articles.map((article, index) => (
              <Link href={'/news/' + article.slug} key={article.slug} className="article-row">
                <span className="article-no">0{index + 1}</span>
                <span className="article-meta">{article.date}<br />{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
