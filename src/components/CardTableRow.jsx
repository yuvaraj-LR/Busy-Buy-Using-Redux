import React from 'react'
import { useDispatch } from 'react-redux';
import { handleAddCartAsync, handleSubCartAsync } from '../redux/reducer/product.reducer';

function CardTableRow({cardData, data}) {
    console.log(cardData, "dataaa./...");

    const {title, price, image, count} = cardData;
    const {fromOrderTable, index} = data;

    const dispatch = useDispatch();

    return (
        <>
            <th scope="row">{index + 1}</th>
            {!fromOrderTable && (
                <td>
                    <img src={image} alt={title} className="cart-img" />
                </td>
            )}
            <td>{title}</td>
            <td className="text-center">
                {!fromOrderTable && (
                    <span className="pointer" onClick={() => dispatch(handleSubCartAsync({data, cardData}))}>
                        <i className="fa-solid fa-circle-minus cart-icons"></i>
                    </span>
                )}
                <span className="count">{count}</span>
                {!fromOrderTable && (
                    <span className="pointer" onClick={() => dispatch(handleAddCartAsync({data, cardData}))}>
                        <i className="fa-solid fa-circle-plus cart-icons"></i>
                    </span>
                )}
            </td>
            <td>&#x20b9;{price}</td>
        </>
    )
}

export default CardTableRow