import Script from 'next/script'
import './globals.scss'

export const metadata = {
  title: 'CKB Node Probe',
  description: 'CKB Node Probe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@2.4.0/Control.FullScreen.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" />
        <Script strategy='beforeInteractive' src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js" />
        <Script strategy='beforeInteractive' src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js" />
        <Script strategy='beforeInteractive' src="https://unpkg.com/leaflet.fullscreen@2.4.0/Control.FullScreen.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
