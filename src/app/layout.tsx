import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '포켓몬 도감',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="h-full w-screen overflow-x-hidden bg-white">
        <main className="w-screen">{children}</main>
      </body>
    </html>
  );
}
