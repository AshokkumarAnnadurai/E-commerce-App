const baseUrl = import.meta.env.VITE_BASE_URL

const makeApiRequest = async (
    path: string,
    config: RequestInit,
): Promise<Response> => {
    try {
        const url = `${baseUrl}${path}` // Combine base URL with path
        console.log("🚀 ~ url:", url)
        const response = await fetch(url, { ...config })
        
        return response
    } catch (error: any) {
        throw error.message
    }
}


export const CustomApiRequest = async (
    path: string,
    config: RequestInit,
    accessToken?: any,
) => {
    try {
        const url = `${baseUrl}${path}` // Combine base URL with path
        const response = await fetch(url, { ...config })

        if ([200, 201].includes(response.status)) {
            return response
        }

        throw new Error(response.statusText)
    } catch (error: any) {
        throw error.message
    }
}

export default makeApiRequest