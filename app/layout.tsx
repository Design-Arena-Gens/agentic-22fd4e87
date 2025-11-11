import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IELTS Coach Pro',
  description: 'Your 6-month AI-guided IELTS preparation coach',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="border-b bg-white sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-semibold text-brand-700">
              <span>IELTS Coach Pro</span>
            </a>
            <nav className="text-sm">
              <a className="px-2 hover:text-brand-600" href="/plan">Plan</a>
              <a className="px-2 hover:text-brand-600" href="/practice/speaking">Speaking</a>
              <a className="px-2 hover:text-brand-600" href="/practice/writing">Writing</a>
              <a className="px-2 hover:text-brand-600" href="/practice/listening">Listening</a>
              <a className="px-2 hover:text-brand-600" href="/practice/reading">Reading</a>
              <a className="px-2 hover:text-brand-600" href="/practice/grammar">Grammar</a>
              <a className="px-2 hover:text-brand-600" href="/practice/vocab">Vocabulary</a>
            </nav>
          </div>
        </div>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t mt-10 py-6 text-center text-xs text-gray-500">
          Built for focused IELTS success in 6 months.
        </footer>
      </body>
    </html>
  );
}
