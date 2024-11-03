import React from 'react'

import Filter from '../components/Filter'
import HomeList from '../components/HomeList'

function Home() {
    return (
        <div className="flex flex_center loader"> 
            <div className="my-4 wrapper">
                <div className="flex flex_row flex_center flex_space_between home_head">
                    <h4>List of Products: </h4>

                    <Filter />
                </div>
                <div className="flex flex_wrap flex_center flex_gap_1 home_card">
                    <HomeList />
                </div>
            </div> 
        </div>
    )
}

export default Home