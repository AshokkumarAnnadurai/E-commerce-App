import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const publicEventRoutes: Routes = [
    {
        key: 'landingpage',
        path: '/',
        component: lazy(() => import('@/views/Home')),
        authority: [],
        meta: {
            layout: 'home',
        },
    }
]

export default publicEventRoutes