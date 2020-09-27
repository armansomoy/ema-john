 import React from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
 import './Product.css'; 
import { Link } from 'react-router-dom';


 const Product = (props) => {
        // console.log(props);




     const {img, name, seller, price, stock, key} = props.product;
     return (
         <div className="product">
             <div className="">
                 <img src={img} alt=""/>
             </div>
             <div className="product-name-part">
                 <h4 className="product-name"> <Link to={"/product/"+key}>{name}</Link> </h4>
                 <p> <small>by: {seller} </small> </p>
                 <p>$ {price}</p>
                 <p> <small> Only {stock} left in stock - ORder Soon </small> </p>
                 { props.showAddToCart && <button onClick={ () => props.handleAddProduct(props.product)} className="main-btn"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
             </div>
         </div>
     );
 };
 
 export default Product;