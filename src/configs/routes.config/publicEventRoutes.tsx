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
    },
    {
        key: 'product',
        path: '/product/:id',
        component: lazy(() => import('@/views/Home/components/ProductPage')),
        authority: [],
        meta: {
            layout: 'home',
        },
    },
    {
        key: 'cart',
        path: '/cart',
        component: lazy(() => import('@/views/Home/components/CartPage')),
        authority: [],
        meta: {
            layout: 'home',
        },
    }
]

export default publicEventRoutes