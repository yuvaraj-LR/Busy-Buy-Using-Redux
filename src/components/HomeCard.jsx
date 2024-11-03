import React from 'react'
import { Link } from 'react-router-dom';

function HomeCard({data}) {
    
    const isUserLoggedIn = true;
    const { title, price, description, image, rating, category } = data;

    return (
        <div className="card" >
            <img src={image} className="card-img-top card_img" alt={title} width="10" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="flex flex_space_between card-title-div">
                    <h2>&#x20b9;{price}</h2>   
                    <div className="flex flex_center card-rating">
                        <span><i className="fa-solid fa-star"></i></span>
                        <span className="">{rating.rate} / 5</span>
                    </div>
                </div>

                {!isUserLoggedIn ? <Link className="w-100 btn btn-primary" to="/signin">Add To Cart</Link> : <button className="w-100 btn btn-primary">Add To Cart</button>}
            </div>
        </div>
    )
}

export default HomeCard