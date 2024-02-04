import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: '포켓몬 도감',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="h-full w-screen overflow-x-hidden bg-white">
        <Providers>
          <main className="w-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
