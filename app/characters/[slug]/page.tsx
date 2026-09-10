import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { getPublishedCharacters } from '@/lib/public-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const character = (await getPublishedCharacters()).find((item) => item.slug === slug);
  return { title: character?.name ?? 'Character', description: character?.description };
}

export default async function CharacterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = (await getPublishedCharacters()).find((item) => item.slug === slug);
  if (!character) return <main className="not-found"><h1>FILE SEALED</h1><Link href="/characters">Return to personnel</Link></main>;
  return (
    <PageShell>
      <main className="detail-page">
        <Link className="back-link" href="/characters"><ArrowLeft size={14} /> Back to personnel</Link>
        <div className="detail-layout">
          <figure className="character-detail-visual" data-file={character.fileRef} aria-label={'Classified portrait placeholder for ' + character.name} />
          <article className="detail-copy">
            <p className="eyebrow">{character.group + ' // ' + character.status}</p><h1>{character.name}</h1><p className="lead">{character.description}</p>
            <dl className="detail-meta"><div><dt>Role</dt><dd>{character.role}</dd></div><div><dt>Affiliation</dt><dd>{character.affiliation}</dd></div><div><dt>Nationality</dt><dd>{character.nationality}</dd></div><div><dt>Status</dt><dd>{character.status}</dd></div><div><dt>First appearance</dt><dd>{character.firstAppearance}</dd></div></dl>
            <div className="prose"><h2>Assessment</h2><p>{character.biography}</p><blockquote>“{character.quote}”</blockquote></div>
          </article>
        </div>
      </main>
    </PageShell>
  );
}
