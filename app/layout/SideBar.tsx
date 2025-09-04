import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, BadgeDollarSign, Goal, TrendingUp, User } from "lucide-react"

const SideBar: React.FunctionComponent = () => {
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Transactions", url: "/transactions", icon: BadgeDollarSign },
    { title: "Budget", url: "/budget", icon: TrendingUp },
    { title: "Goals", url: "/goals", icon: Goal },
    { title: "Profile", url: "/profile", icon: User },
  ]
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex space-x-2 p-4 my-4">
            <div className=" bg-primary rounded-sm p-2">
              <TrendingUp className="text-white rounded-sm" />
            </div>
            <span className="text-lg">Finance App</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar
