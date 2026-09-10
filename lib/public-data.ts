import { articles, books, characterGroups, characters, products, series, siteSettings, type Article, type Book, type Character } from './content';
import { isSupabaseConfigured, supabase } from './supabase';

export async function getGlobalContent() {
  if (!isSupabaseConfigured || !supabase) return siteSettings;
  const [{ data: crossLinks }, { data: socials }, { data: heroRows }] = await Promise.all([
    supabase.from('cross_site_links').select('*').eq('is_enabled', true).limit(1),
    supabase.from('social_links').select('*').eq('is_enabled', true).order('display_order'),
    supabase.from('homepage_sections').select('*').eq('section_key', 'hero').eq('is_published', true).limit(1),
  ]);
  const cross = crossLinks?.[0];
  const hero = heroRows?.[0];
  return {
    ...siteSettings,
    heroEyebrow: hero?.eyebrow ?? siteSettings.heroEyebrow,
    heroHeading: hero?.heading ?? siteSettings.heroHeading,
    heroText: hero?.supporting_text ?? siteSettings.heroText,
    shadowverse: cross ? {
      label: cross.label,
      supportingText: cross.promotion_text,
      url: cross.destination_url,
      enabled: cross.is_enabled,
      openInNewTab: cross.open_in_new_tab,
    } : siteSettings.shadowverse,
    socialLinks: socials?.length ? socials.map((item) => ({ platform: item.platform, label: item.label, url: item.url })) : siteSettings.socialLinks,
  };
}

export async function getPublishedSeries() {
  if (!isSupabaseConfigured || !supabase) return series;
  const { data, error } = await supabase.from('series').select('*').eq('is_published', true).is('archived_at', null).order('display_order');
  if (error) return series;
  return (data ?? []).map((item) => ({
    slug: item.slug,
    name: item.name,
    subtitle: item.subtitle ?? '',
    description: item.description ?? '',
    quote: item.quote ?? '',
    status: item.status ?? '',
  }));
}

export async function getPublishedBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured || !supabase) return books;
  const { data, error } = await supabase.from('books').select('*, series(name), book_purchase_links(label,url,display_order,is_enabled)').eq('is_published', true).order('display_order');
  if (error) return books;
  return (data ?? []).map((item) => ({
    slug: item.slug,
    title: item.title,
    series: item.series?.name ?? 'The Myriad',
    position: item.series_position ?? 0,
    status: item.publication_status,
    releaseDate: item.release_date ?? '',
    releaseLabel: item.release_label ?? item.release_date ?? '',
    shortDescription: item.short_description ?? '',
    synopsis: item.synopsis ?? item.long_description ?? '',
    quote: item.quote ?? '',
    endorsement: item.endorsement_quote ?? undefined,
    endorsementSource: item.endorsement_source ?? undefined,
    isbn: item.isbn ?? undefined,
    coverClass: 'cover-ghost',
    purchaseLinks: (item.book_purchase_links ?? []).filter((link: { is_enabled: boolean }) => link.is_enabled).sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order).map((link: { label: string; url: string }) => ({ label: link.label, url: link.url })),
  }));
}

export async function getPublishedCharacterGroups() {
  if (!isSupabaseConfigured || !supabase) return characterGroups;
  const { data, error } = await supabase.from('character_groups').select('*').eq('is_published', true).is('archived_at', null).order('display_order');
  if (error) return characterGroups;
  return (data ?? []).map((item) => ({ name: item.name, description: item.description ?? '' }));
}

export async function getPublishedCharacters(): Promise<Character[]> {
  if (!isSupabaseConfigured || !supabase) return characters;
  const { data, error } = await supabase.from('characters').select('*, character_groups(name), books(title)').eq('is_published', true).order('display_order');
  if (error) return characters;
  return (data ?? []).map((item) => ({
    slug: item.slug,
    name: item.name,
    role: item.rank_title ?? '',
    group: item.character_groups?.name ?? 'Personnel',
    affiliation: item.organisation ?? '',
    nationality: item.nationality ?? '',
    status: item.status ?? '',
    firstAppearance: item.books?.title ?? '',
    description: item.short_description ?? '',
    biography: item.biography ?? '',
    quote: item.quote ?? '',
    fileRef: 'MYR / ' + String(item.display_order ?? 0).padStart(2, '0'),
  }));
}

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured || !supabase) return articles;
  const { data, error } = await supabase.from('news_articles').select('*, news_categories(name)').eq('is_published', true).lte('publication_date', new Date().toISOString()).order('publication_date', { ascending: false });
  if (error) return articles;
  return (data ?? []).map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary ?? '',
    body: String(item.body ?? '').split(/\n\n+/).filter(Boolean),
    date: item.publication_date ? new Date(item.publication_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '',
    category: item.news_categories?.name ?? 'Report',
    author: item.author ?? 'The Myriad Desk',
    featured: item.is_featured,
  }));
}

export async function getPublishedProducts() {
  if (!isSupabaseConfigured || !supabase) return products;
  const { data, error } = await supabase.from('products').select('*, product_categories(name)').eq('is_published', true).order('display_order');
  if (error) return products;
  return (data ?? []).map((item) => ({
    name: item.name,
    subtitle: item.subtitle ?? '',
    category: item.product_categories?.name ?? 'Catalogue',
    price: item.price == null ? '' : new Intl.NumberFormat('en-GB', { style: 'currency', currency: item.currency ?? 'GBP' }).format(item.price),
    availability: item.availability ?? '',
    description: item.description ?? '',
    coverClass: 'cover-atlas',
    purchaseUrl: item.purchase_url ?? '#',
  }));
}
