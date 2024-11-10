import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInitialProductState, productSelector } from '../redux/reducer/product.reducer';
import Empty from '../components/Empty';
import CardTableRow from '../components/CardTableRow';

function Order() {
    const dispatch = useDispatch();
    const {cartPriceCount, data} = useSelector(productSelector);

    useEffect(() => {
        dispatch(getInitialProductState());
    }, []);

    const { orderedItem } = data;
    const orderedDataLength = orderedItem && orderedItem.length > 0 ? true : false;

    return (
        <div className="wrapper my-4">
            <h3>Your Orders: </h3>

            {orderedDataLength ? 
                <>
                    {orderedItem?.map(item => (
                        <>
                            <h5 className="my-4 text-center" style={{textDecoration: "underline"}}><span className="bold">
                            Ordered On:</span> {item.data}</h5>

                            <table className="table table-striped bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item?.cartItem?.map((data, i) => (
                                        <tr className="cart_table_row" key={i}>
                                            <CardTableRow cardData={data} data= {{"index": i, "fromOrderTable": true}} />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="text-end w-100">
                                <h4 className="flex flex_space_between total_count">
                                    <span>TOTAL</span> &nbsp;&nbsp;
                                    <span>&#x20b9;{item.cartPriceCount}</span>
                                </h4>
                            </div>
                        </>
                    ))}
                </>
            : <Empty text="No orders data available." /> }
        </div>
    )
}

export default Order