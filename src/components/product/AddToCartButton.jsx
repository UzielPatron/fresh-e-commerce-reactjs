import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../api/cartApi';
import { Alert } from '../utils/Alert';


export const AddToCartButton = ({ idProduct, quantity, stock, auth }) => {
  
    const navigate = useNavigate()

    const addToCart = () => {
        if(auth){
            const response = addProductToCart(idProduct, quantity, stock);
            if(response) Alert('Producto añadido al carrito','', 'success');
            else Alert('No se pudo agregar el producto al carrito');
        }
        else {
            Alert('Inicia sesión o regístrate para añadir el producto al carrito', '', 'info');
            navigate('/auth/login');
        }
    }

    return (
    <button
        className="product__btns_addToCart"
        onClick={ addToCart }
    >
        <p className="product__btns_addToCart_text">AÑADIR AL CARRITO</p>
        <ion-icon name="cart-outline"></ion-icon>
    </button>
  )
};
