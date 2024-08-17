import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const location = useLocation()
    const { authenticated } = useAuth()
    if(authenticated && location.pathname=='/sign-in') {
        return <Navigate replace to={authenticatedEntryPath}/>
    }  

    return  <Outlet />
}

export default PublicRoute
