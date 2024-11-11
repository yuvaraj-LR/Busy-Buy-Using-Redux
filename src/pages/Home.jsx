import React, { useEffect } from 'react';
import Filter from '../components/Filter';
import HomeList from '../components/HomeList';
import Empty from '../components/Empty';
import { getInitialProductState, productSelector } from '../redux/reducer/product.reducer';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const { data, searchedProducts } = useSelector(productSelector);

    useEffect(() => {
        dispatch(getInitialProductState());
    }, [dispatch]);
    console.log(searchedProducts, "productt..");

    return (
        <div className="flex flex_center loader"> 
            <div className="my-4 wrapper">
                <div className="flex flex_row flex_center flex_space_between home_head">
                    <h4>List of Products: </h4>
                    <Filter />
                </div>
                <div className="flex flex_wrap flex_center flex_gap_1 home_card">
                    {searchedProducts.length > 0 ? (
                        <HomeList data={searchedProducts} />
                    ) : searchedProducts.length === 0 ? (
                        <Empty text="No Product Found! Try adjusting your search or filter criteria."/> 
                    ) : (
                        <HomeList data={data} />
                    )}
                </div>
            </div> 
        </div>
    );
}

export default Home;
