// app/layout.tsx
import Script from "next/script"
import { GA_TRACKING_ID } from "@/lib/gtag"
import { Montserrat } from "next/font/google"
import "../styles/globals.css"
import { Toaster } from "react-hot-toast"
import Analytics from "./analytics"
import { Suspense } from "react"
import AIAgent from "@/components/ai-agent"
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700"],
})

export const metadata = {
  title: "Loyal E Services",
  description: "Welcome to Loyal E Services!",
  alternates: {
    canonical: 'https://loyaleservices.com/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="flex flex-col h-screen">
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {children}
        <AIAgent />
        <Suspense fallback={<div>Loading animation...</div>}>
          <Analytics />
        </Suspense>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
