import { Spinner } from "@/components/ui"
import makeApiRequest from "@/services/makeApiRequest"
import { ImSpinner } from 'react-icons/im'


export const CustomSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Spinner size={60} indicator={ImSpinner} />
        </div>
    )
}

// Function to calculate original price from discounted price and discount percentag
export const calculateOriginalPrice = (discountedPrice: number, discountPercentage: number) => {
    return discountedPrice / (1 - discountPercentage / 100);
};


export const TransformAPI = async (
    method: 'POST' | 'PATCH' | 'GET' | 'DELETE',
    endpoint: string,
    body?: any,
): Promise<any> => {
    try {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const requestOptions: RequestInit = {
            method,
            headers: typeof body == 'string' ? headers : undefined,
            body: body ? body : undefined,
        }

        const response = await (await makeApiRequest(endpoint, requestOptions)).json()

        if (!response.statusCode) {
            return response
        }
        if ([200, 201].includes(response.statusCode)) {
            return response.data
        } else {
            if (response.message && typeof response.message === 'string') {
                throw new Error(response.message)
            } else {
                throw new Error(response.error)
            }
        }
    } catch (err) {
        throw err.message
    }
}