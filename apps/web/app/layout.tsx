import { Providers } from '@/components/providers'
import '@workspace/ui/styles/globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Record',
  description: 'Record your voice and get transcription',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <div className="flex-1">
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
          <footer className="py-6 border-t border-white/[0.03]">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-white/40">
                Made with ♥️ by <a href="https://ubeytdemir.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">ubeytdemir</a> | {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

