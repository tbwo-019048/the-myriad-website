import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const display = Oswald({ variable: '--font-display', subsets: ['latin'] });
const body = Source_Sans_3({ variable: '--font-body', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'The Myriad | Espionage Thrillers by Toby Crome', template: '%s | The Myriad' },
  description: 'The official home of The Myriad, Toby Crome’s modern espionage and action-thriller series.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={display.variable + ' ' + body.variable}>{children}</body></html>;
}
