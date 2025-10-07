import Sidebar from "../layout/SideBar"
import Topbar from "../layout/TopBar"
import { Toaster } from "@/components/ui/sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CircleCheck, CircleX, Info, Loader, TriangleAlert } from "lucide-react"

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
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "toast",
                title: "title",
                description: "description",
                closeButton: "close-button",
              },
            }}
            icons={{
              success: <CircleCheck />,
              info: <Info />,
              warning: <TriangleAlert />,
              error: <CircleX />,
              loading: <Loader />,
            }}
          />
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
