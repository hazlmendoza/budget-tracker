"use client"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem> */}
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
          {pathSegments.length > 0 && <BreadcrumbSeparator />}
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`
            const linkName = segment.charAt(0).toUpperCase() + segment.slice(1)
            const isLastPath = pathSegments.length === index + 1
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {!isLastPath ? (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{linkName}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {pathSegments.length !== index + 1 && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        {/* </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
