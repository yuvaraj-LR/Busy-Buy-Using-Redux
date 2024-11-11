import React from 'react'
import HomeCard from './HomeCard'

function HomeList({data}) {
    return (
        <>
            {
                data.map((cardData, index) => (
                    <div className="home_cards" key={index}>
                        <HomeCard data={data} cardData={cardData} />
                    </div>
                ))
            }
        </>
    )
}

export default HomeList