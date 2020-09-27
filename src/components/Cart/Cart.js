 import React from 'react';

 
 const Cart = (props) => {
     const cart = props.cart;
    //  console.log(cart);
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    //  const total = cart.reduce( (total, prd) => total + prd.price *prd.quantity , 0 )
    
     let shipping = 0;
     if( total > 35){
         shipping = 0;
     }
     else if( total > 15 ){
         shipping = 4.99;
     }
     else if( total > 0 ){
         shipping = 12.99
     }

     const tax = (total / 10).toFixed(2);
     const grandTotal = Math.round(total + Number(tax) + shipping);

     const formatNumber = num => {
         const precision = num.toFixed(2);
         return Number(precision);
     }
     return (
         <div>
             <h4 className="text-primary">Order Summary</h4>
             <p>Item Ordered: {cart.length} </p>
             <p>Product Price : {formatNumber(total)} </p>
             <p>Shipping Price : {shipping} </p>
             <p>  <small> Tax & Vat : {tax} </small>  </p>
             <p>Total Price: {grandTotal}</p>
             <br/>
             {props.children}
         </div>
     );
 };
 
 export default Cart;