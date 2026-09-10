import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { getPublishedCharacterGroups, getPublishedCharacters } from '@/lib/public-data';

export const metadata: Metadata = { title: 'Characters', description: 'Meet the operatives, analysts and adversaries of The Myriad.' };

export default async function CharactersPage() {
  const [characterGroups, characters] = await Promise.all([getPublishedCharacterGroups(), getPublishedCharacters()]);
  return (
    <PageShell>
      <main>
        <section className="page-hero"><div className="page-title"><p className="eyebrow">PERSONNEL ARCHIVE // AUTHORISED</p><h1>Operatives</h1><p>Every name is connected. Every allegiance is provisional. Access the people behind the operations.</p></div><span className="page-code">CLEARANCE / LEVEL 04</span></section>
        <section className="character-groups">
          {characterGroups.map((group, groupIndex) => {
            const members = characters.filter((character) => character.group === group.name);
            if (!members.length) return null;
            return <section className="character-group" key={group.name}>
              <div className="group-heading"><div><p className="kicker">GROUP 0{groupIndex + 1}</p><h2>{group.name}</h2></div><p className="lead">{group.description}</p></div>
              <div className="character-grid">{members.map((character) => <Link className="character-card" href={'/characters/' + character.slug} key={character.slug}>
                <span className="portrait-code">{character.fileRef}</span><div className="portrait-placeholder" aria-hidden="true" /><small>{character.role}</small><h3>{character.name}</h3><p>{character.description}</p><ArrowRight />
              </Link>)}</div>
            </section>;
          })}
        </section>
      </main>
    </PageShell>
  );
}
