"use client"
import {AuthProvider} from "./context/AuthContext"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Finance App</title>
        </head>
        <body>
          <main className="h-screen w-full">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
