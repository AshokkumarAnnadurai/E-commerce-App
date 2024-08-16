import { combineReducers } from "@reduxjs/toolkit";
import reducers,{ HomeListState, SLICE_NAME } from "./homeSlice";
import { useSelector } from "react-redux";

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data:reducers
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]:{
            data:HomeListState
        }
    }
> = useSelector

export * from './homeSlice'
export {useAppDispatch} from'@/store'
export default reducer