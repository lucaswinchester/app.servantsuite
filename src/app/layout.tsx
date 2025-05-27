import './globals.css';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeWrapper } from '@/components/theme/theme-wrapper';
import { SidebarProvider } from '@/context/SidebarContext';
import SidebarLayout from '@/components/layout/SidebarLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'ServantSuite Dashboard',
  description: 'A modern dashboard for ministry management',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('servantsuite-theme') || 'system';
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (theme === 'dark' || (theme === 'system' && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased">
        <ClerkProvider>
          <ThemeWrapper>
            <SidebarProvider>
              <SidebarLayout>
                <Suspense fallback={null}>
                  {children}
                </Suspense>
              </SidebarLayout>
            </SidebarProvider>
          </ThemeWrapper>
        </ClerkProvider>
      </body>
    </html>
  )
}
