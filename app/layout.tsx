import Sidebar from "./layout/SideBar"
import Topbar from "./layout/TopBar"
import './globals.css';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Breadcrumbs from "./../components/Breadcrumbs"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Topbar />

        <SidebarProvider>
          <Sidebar />
          <main className="h-screen w-full">
            <SidebarTrigger />
            <Breadcrumbs/>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
