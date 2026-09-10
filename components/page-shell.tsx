import { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
