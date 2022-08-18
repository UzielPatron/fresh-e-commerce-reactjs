import React from 'react';
import '../../stylesheets/components/product/quantity.css';
import { Alert } from '../utils/Alert';

export const Quantity = ({ quantity, setQuantity, stock, setReloadCart }) => {
  
    const decrementQuantity = () => {
        if(quantity > 1){
            setQuantity( quantity - 1);
        }
    };

    const incrementQuantity = () => {
        if(quantity < stock){
            setQuantity( quantity + 1 );
        }
        else Alert('No hay suficiente stock')
    };
  
    return (
    <div className="product__btns__quantity-container">
        <div className="product__btns__quantity">
            <ion-icon
                name="remove-outline"
                onClick={ decrementQuantity }
            ></ion-icon>
            <input className='product__btns__quantity-input' value={ quantity } readOnly/>
            <ion-icon
                name="add-outline"
                onClick={ incrementQuantity }
            ></ion-icon>
        </div>
    </div>
  )
};