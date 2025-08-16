import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#3b82f6",
}

export const metadata: Metadata = {
  title: "SEO Expert - SEO Report Generator",
  description:
    "Get comprehensive SEO audits and detailed reports for your Website. Improve your website performance with actionable insights.",
  keywords: "SEO audit, SEO analysis, website analysis, Web page optimization,SEO report,SEO audit tool",
  authors: [{ name: "SEO Expert" }],
  creator: "SEO Expert",
  publisher: "SEO Expert",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seoexpert.ma",
    title: "SEO Expert - SEO Report Generator",
    description: "Get comprehensive SEO audits and detailed reports for your Website .",
    siteName: "SEO Expert",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Expert - SEO Report Generator",
    description: "Get comprehensive SEO audits and detailed reports for your Website .",
    creator: "@seoexpert",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://seoexpert.ma" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "SEO Expert",
              description: "Comprehensive SEO audits and detailed reports",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
            <SonnerToaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
