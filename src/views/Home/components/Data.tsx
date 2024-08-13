import { Card, toast } from '@/components/ui'
import React, { useEffect, useState } from 'react'

const Data = () => {

    const [data , setData] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch('http://localhost:5000/api/products').then((res) => {
                if(res.ok) {
                    return res.json()
                }
            })
            setData(response)
        }
        fetchData()
    },[])
  return (
    <Card>
        {data && data.map((data , index)=>{
            return <>{data.name}</>
        })}
    </Card>
  )
}

export default Data