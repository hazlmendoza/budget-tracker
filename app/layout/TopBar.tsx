"use client"
import Link from "next/link"
import ProfileLetter from "../(dashboard)/profile/page"

const Topbar: React.FC = () => {

  return (
    <nav className="bg-primary text-white p-3 flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link className="text-md" href="/dashboard">
          Savis
        </Link>
      </div>
      <div className="flex">
        {/* <Button variant="secondary" onClick={handleLogOut} disabled={loading}>
          {loading ? "Logging Out..." : "Log Out"}
        </Button> */}
        <ProfileLetter/>
      </div>
    </nav>
  )
}

export default Topbar