import Link from 'next/link';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center pb-16">
      <Link href="/" className="bg-slate-100 rounded-full py-3 px-6 mt-3">
        홈으로
      </Link>
      {children}
    </div>
  );
};

export default Layout;
