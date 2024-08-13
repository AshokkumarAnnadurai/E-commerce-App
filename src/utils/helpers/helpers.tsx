import { Spinner } from "@/components/ui"
import { ImSpinner } from 'react-icons/im'


export const CustomSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Spinner size={60} indicator={ImSpinner} />
        </div>
    )
}