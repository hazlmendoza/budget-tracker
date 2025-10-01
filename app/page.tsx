import Loading from "@/components/Loading"
import CommonTopbar from "./layout/CommonTopBar"
import { Suspense } from "react"

const LandingPage = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <div>
        <CommonTopbar />
        This is a landing page.
        {/* <Dashboard/> */}
      </div>
    </Suspense>
  )
}

export default LandingPage
