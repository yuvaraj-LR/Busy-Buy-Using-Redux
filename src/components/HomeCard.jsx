import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginSelector } from '../redux/reducer/login.reducer';
import { handleAddCartAsync, productReducer } from '../redux/reducer/product.reducer';

function HomeCard({data, cardData}) {
    const isUserLoggedIn = useSelector(loginSelector);
    const { title, price, description, image, rating, category } = cardData;

    const dispatch = useDispatch();

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

                {!isUserLoggedIn ? <Link className="w-100 btn btn-primary" to="/signin">Add To Cart</Link> : <button className="w-100 btn btn-primary" onClick={(e) => dispatch(handleAddCartAsync({data, cardData}))}>Add To Cart</button>}
            </div>
        </div>
    )
}

export default HomeCard