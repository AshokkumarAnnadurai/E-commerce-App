import { Suspense, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import appConfig from '@/configs/app.config'
import PageContainer from '@/components/template/PageContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import ProtectedRoute from '@/components/route/ProtectedRoute'
import PublicRoute from '@/components/route/PublicRoute'
import AuthorityGuard from '@/components/route/AuthorityGuard'
import AppRoute from '@/components/route/AppRoute'
import type { LayoutType } from '@/@types/theme'
import authRoute from '@/configs/routes.config/authRoute'
import { CustomSpinner } from '@/utils/helpers/helpers'
import publicEventRoutes from '@/configs/routes.config/publicEventRoutes'
import Starter from '@/configs/routes.config/starter'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const AllRoutes = (props: AllRoutesProps) => {
    const userAuthority = useAppSelector((state) => state.auth.user.authority)

    const { protectedRoutes, publicRoutes } = props

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route , index) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                            key={route.key + index}
                                routeKey={route.key + index}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>
            <Route element={<ProtectedRoute />}>
                {protectedRoutes.map((route , index) => (
                    <Route
                    key={route.key + index}
                    path={route.path}
                    element={
                        <AuthorityGuard
                            userAuthority={userAuthority}
                            authority={route.authority}
                        >
                            <PageContainer {...props} {...route.meta}>
                                <AppRoute
                                    key={route.key + index}
                                    routeKey={route.key}
                                    component={route.component}
                                    {...route.meta}
                                />
                            </PageContainer>
                        </AuthorityGuard>
                    }
                    />
                ))}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

const Views = (props: ViewsProps) => {

    const protectedRoutes = useMemo(()=> [
        ...Starter
    ],[])

    const publicRoutes = useMemo(()=> [...authRoute , ...publicEventRoutes],[])
    return (
        <Suspense fallback={<div className="flex flex-auto flex-col h-screen w-screen items-center justify-center">
            <CustomSpinner />
        </div>}>
            <AllRoutes {...props} protectedRoutes={protectedRoutes} publicRoutes={publicRoutes}/>
        </Suspense>
    )
}

export default Views
