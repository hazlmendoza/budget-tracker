import { DollarSign } from "lucide-react"
import Link from "next/link"
import React from "react"

const Topbar: React.FC = () => {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <DollarSign className="h-5 w-5 mr-2" />{" "}
        {/* Icon with size and margin */}
        <Link className="text-md" href="/dashboard">
          Finance
        </Link>
      </div>
      <div className="space-x-4">
        <Link className="text-md" href="/">
          Sign Up
        </Link>
        <Link className="text-md" href="/">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Topbar
