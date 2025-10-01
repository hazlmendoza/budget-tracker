import { FileMinus } from "lucide-react"
import React from "react"

interface EmptyDataProps {
  description: string
}

const EmptyData: React.FC<EmptyDataProps> = ({ description }) => {
  return (
    <>
      <FileMinus className="h-20 w-20 mb-4 text-gray-400 animate-bounce" />
      <p className="text-lg text-gray-600 font-semibold">No data to display</p>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  )
}

export default EmptyData