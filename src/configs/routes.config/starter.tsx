import { lazy } from 'react'
import type { Routes } from '@/@types/routes'


const Starter: Routes = [
    {
        key: 'EntryScreen',
        path: `/Welcome`,
        component: lazy(() => import('@/views/Home')),
        authority: []
    },
  
 
]

export default Starter