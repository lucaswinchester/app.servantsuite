export const metadata = {
  title: 'ServantSuite Dashboard',
  description: 'A modern dashboard for ministry management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
