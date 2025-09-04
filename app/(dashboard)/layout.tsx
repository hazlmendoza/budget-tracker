// import Sidebar from "../layout/SideBar"
// import Topbar from "../layout/TopBar"

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import Breadcrumbs from "../../components/Breadcrumbs"

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <Topbar />

//         <SidebarProvider>
//           <Sidebar />
//           <main className="h-screen w-full">
//             <SidebarTrigger />
//             <Breadcrumbs/>
//             {children}
//           </main>
//         </SidebarProvider>
//       </body>
//     </html>
//   )
// }


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
          <main className="h-screen w-full">
            {children}
          </main>
      </body>
    </html>
  )
}

