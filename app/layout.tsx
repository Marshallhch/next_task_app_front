import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar/Sidebar';
import GlobalStyleProvider from './providers/GlobalStyleProvider';
import ContextProvider from './providers/ContextProvider';
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import NextTopLoader from 'nextjs-toploader';

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  console.log(userId);

  return (
    <ClerkProvider>
      {!userId ? <RedirectToSignIn /> : null}

      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(.53, .621, 0, 1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
