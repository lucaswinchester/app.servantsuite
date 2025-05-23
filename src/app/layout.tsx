import './globals.css';

export const metadata = {
  title: 'ServantSuite Dashboard',
  description: 'A modern dashboard for ministry management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  )
}
