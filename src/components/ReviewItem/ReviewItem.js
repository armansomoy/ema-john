import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '20px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name"> {name}</h4>
            <p> $ {price} </p>
            <p> Quantity: {quantity}</p>
            <br/>
            <button
             className="main-btn"
             onClick={ () => props.removeProduct(key)}
             >Remove</button>
        </div>
    );
};

export default ReviewItem;