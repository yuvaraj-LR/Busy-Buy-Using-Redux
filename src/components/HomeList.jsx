import React from 'react'
import { busyBuyData } from '../data/item.data'
import HomeCard from './HomeCard'

function HomeList() {
    return (
        <>
            {
                busyBuyData.map((data, index) => (
                    <div className="home_cards" key={index}>
                        <HomeCard data={data} />
                    </div>
                ))
            }
        </>
    )
}

export default HomeList