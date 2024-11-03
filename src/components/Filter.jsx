import React from 'react'

function Filter() {
    return (
        <div className="flex flex_row flex_center gap-3">
            <p className="m-0">Filter : </p>
            <div className={`btn btn-outline-dark `}>Men</div>
            <div className={`btn btn-outline-dark `}>Women</div>
            <div className={`btn btn-outline-dark `}>Jewelery</div>
            <div className={`btn btn-outline-dark `}>Electronics</div>

            <div className="btn btn-outline-danger">Clear</div>
        </div>
    )
}

export default Filter