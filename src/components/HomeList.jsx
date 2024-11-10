import React from 'react'
import { busyBuyData } from '../data/item.data'
import HomeCard from './HomeCard'

function HomeList({data}) {
    return (
        <>
            {
                busyBuyData.map((cardData, index) => (
                    <div className="home_cards" key={index}>
                        <HomeCard data={data} cardData={cardData} />
                    </div>
                ))
            }
        </>
    )
}

export default HomeList