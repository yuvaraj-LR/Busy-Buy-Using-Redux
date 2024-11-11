import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCategoryFilter, setCategoryFilter } from '../redux/reducer/product.reducer';

function Filter() {
    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state) => state.productReducer);

    const handleFilterClick = (category) => {
        dispatch(setCategoryFilter(category));
    };

    const handleClearClick = () => {
        dispatch(clearCategoryFilter());
    };

    return (
        <div className="flex flex_row flex_center gap-3">
            <p className="m-0">Filter: </p>
            <div
                className={`btn btn-outline-dark ${selectedCategory === 'men' ? 'active' : ''}`}
                onClick={() => handleFilterClick('men')}
            >
                Men
            </div>
            <div
                className={`btn btn-outline-dark ${selectedCategory === 'women' ? 'active' : ''}`}
                onClick={() => handleFilterClick('women')}
            >
                Women
            </div>
            <div
                className={`btn btn-outline-dark ${selectedCategory === 'jewelery' ? 'active' : ''}`}
                onClick={() => handleFilterClick('jewelery')}
            >
                Jewelery
            </div>
            <div
                className={`btn btn-outline-dark ${selectedCategory === 'electronics' ? 'active' : ''}`}
                onClick={() => handleFilterClick('electronics')}
            >
                Electronics
            </div>
            <div className="btn btn-outline-danger" onClick={handleClearClick}>
                Clear
            </div>
        </div>
    );
}

export default Filter;
