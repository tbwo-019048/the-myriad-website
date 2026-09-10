import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';

export const metadata: Metadata = { title: 'Privacy' };
export default function PrivacyPage() {
  return <PageShell><main className="detail-page"><article className="article-detail"><p className="eyebrow">LEGAL // PRIVACY</p><h1>Privacy notice</h1><div className="article-body"><p>This website only collects information required to operate the service, maintain security and respond to messages you choose to send. External retailer and social links are governed by their respective privacy policies.</p><p>Administrative access is protected through Supabase Authentication. No public visitor can create, edit or delete site content.</p></div></article></main></PageShell>;
}
