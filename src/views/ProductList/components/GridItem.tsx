import { Card } from '@/components/ui'
import React from 'react'

type GridItemProps = {
  data:{
    id:number,
    img:string,
    name:string,
    price:string,
    discountPrice:string
  }
}

const GridItem = ({ data }: GridItemProps) => {
  const {img , name , price , discountPrice} = data

  return (
    <Card bodyClass="h-full">
      <div>
        <img src={img}></img>
      </div>
        <h6>{discountPrice}<strike>{price}</strike> </h6>
        <h6>{name}</h6>
    </Card>
  )
}

export default GridItem