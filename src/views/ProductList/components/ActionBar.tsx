import { Button, Tooltip } from '@/components/ui'
import React from 'react'
import { toggleView, useAppDispatch, useAppSelector } from '../store'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'

const ActionBar = () => {

    const dispatch = useAppDispatch()

    const view = useAppSelector((state)=>state.productList.data.view)

    const onViewToggle = () => {
        dispatch(toggleView(view === 'grid' ? 'list' : 'grid'))
    }
  return (
    <div className="lg:flex items-center justify-between mb-4">
        <h3>Products List</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-1">
                {/* <Input
                    ref={inputRef}
                    size="sm"
                    placeholder="Search"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                /> */}
                <Tooltip title={view === 'grid' ? 'List view' : 'Grid view'}>
                    <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={
                            view === 'grid' ? (
                                <HiOutlineViewList />
                            ) : (
                                <HiOutlineViewGrid />
                            )
                        }
                        onClick={() => onViewToggle()}
                    />
                </Tooltip>
            </div>
    </div>
  )
}

export default ActionBar