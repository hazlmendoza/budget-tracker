import Loading from "@/components/Loading"
import CommonTopbar from "./layout/CommonTopBar"
import { Suspense } from "react"
import LandingPage from "./layout/LandingPage"

const Page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div>
          <CommonTopbar />
          <LandingPage />
        </div>
      </Suspense>
    </>
  )
}

export default Page
