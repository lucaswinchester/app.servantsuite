import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeWrapper } from '@/components/theme/theme-wrapper';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

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
      <body className="min-h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased">
        <ClerkProvider
          appearance={{
            baseTheme: undefined,
            variables: { colorPrimary: '#FF6B6B' },
            elements: {
              rootBox: 'w-full',
              card: 'shadow-none',
              headerTitle: 'text-2xl font-bold',
              headerSubtitle: 'text-gray-600 dark:text-gray-300',
              formFieldInput: 'w-full',
              formButtonPrimary: 'w-full',
              footerActionLink: 'text-primary hover:text-primary/80',
            },
          }}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <ThemeWrapper>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
