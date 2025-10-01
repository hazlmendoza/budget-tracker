import Sidebar from "../layout/SideBar"
import Topbar from "../layout/TopBar"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Topbar />
      <SidebarProvider>
        <Sidebar />
        <div className="h-screen w-full">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body>
//           <main className="h-screen w-full">
//             {children}
//           </main>
//       </body>
//     </html>
//   )
// }
