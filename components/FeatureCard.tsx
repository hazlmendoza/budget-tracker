import React from "react"

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80 text-center">
    {icon && (
      <div className="flex justify-center text-3xl text-blue-500">
        {icon}
        <h3 className="ml-2 text-xl text-black font-semibold">{title}</h3>
      </div>
    )}

    <p className="mt-2 text-gray-700">{description}</p>
  </div>
)

export default FeatureCard
