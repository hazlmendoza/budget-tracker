import { Loader } from "lucide-react"

const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-muted/50 flex justify-center items-center z-50">
            <Loader className="animate-spin text-white w-8 h-8" /> 
        </div>
    )
}

export default LoadingOverlay