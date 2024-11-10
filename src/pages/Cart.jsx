import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInitialProductState, handleBuyNowAsync, handleClearAll, productSelector } from '../redux/reducer/product.reducer';

import CardTableRow from '../components/CardTableRow';
import Empty from '../components/Empty';

function Cart() {
    const dispatch = useDispatch();
    const {cartPriceCount, data} = useSelector(productSelector);

    useEffect(() => {
        dispatch(getInitialProductState());
    }, [])

    const { cartItem } = data;

    return (
        <div className="wrapper my-3">
            {
                cartItem && cartItem.length > 0 ? (
                    <>
                        {/* <CartTable data={productData} />  */}
                        <div className="card_table">
                            <table className="table table-striped bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItem?.map((cardData, i) => (
                                        <tr className="cart_table_row" key={i}>
                                            <CardTableRow cardData={cardData} index={i} data={data} />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-end w-100">
                            <h4 className="flex flex_space_between total_count">
                                <span>TOTAL</span> &nbsp;&nbsp;
                                <span>&#x20b9;{cartPriceCount}</span>
                            </h4>
                        </div>

                        <div className="text-end w-100 buy_btn">
                            <button className="btn btn-outline-danger mx-4" onClick={() => dispatch(handleClearAll({data}))}>Clear All</button>
                            <button className="btn btn-danger" onClick={() => dispatch(handleBuyNowAsync({data}))} >Buy Now</button>
                        </div> 
                    </>
                ) : (
                    <Empty text="No items in cart" />
                )
            }
        </div>
    )
}

export default Cart