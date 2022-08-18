import React, { useState, useEffect } from 'react';
import { deleteProductToCart } from '../../api/cartApi';
import { API_URL } from '../../utils/constants';
import { Prices } from '../product/Prices';
import { Quantity } from '../product/Quantity';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';



export const CartItemProduct = ({ product, setReloadCart, productsInCart, setProductsInCart }) => {
    
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    
    const deleteToCart = () => {
        setLoading(true);
        deleteProductToCart(product.id);
        setReloadCart(true);
        Alert('Producto eliminado del carrito', '', 'success');
        setLoading(false);
    };
    
    
    useEffect(() => {
        setQuantity(product.quantity);
    }, []);

    useEffect(() => {
        const cartUpdated = productsInCart.map( productItem => {
            if(productItem.id === product.id){
                return {
                    ...productItem,
                    quantity,
                }
            }
            else return productItem;
        } );
        setProductsInCart(cartUpdated);
    }, [quantity]);

    return (
    <>
        {
            loading
                ? <Loading />
                :   <div
                        to={ `/product/${ product.id }` }
                        className="account__cart__card"
                    >
                        <div className="account__cart__card__image-container">
                            <img src={ `${ API_URL }${ product?.main_image?.formats?.small?.url }` } alt={ product.title } className="account__cart__card__image" />
                        </div>
                        <div className="account__cart__card__data-container">
                            <div className="account__cart__card__data__info">
                                <h5 className="account__cart__card__data__title">
                                    { product.title }
                                </h5>
                                <Prices price={ product.price } discount={ product.discount } />
                            </div>
                            <div className="account__cart__card__data__btns">
                                <div className="account__cart__card__data__btnAddToCart-container">
                                    <Quantity 
                                        quantity={ quantity }
                                        setQuantity={ setQuantity }
                                        stock={ product.stock }
                                        setReloadCart={ setReloadCart }
                                    />
                                </div>
                                <div className="account__cart__card__data__btnDeleteFavorite-container">
                                    <button
                                        className="account__cart__card__data__btnDeleteFavorite account__cart__card__data__btn"
                                        onClick={ deleteToCart }
                                    >
                                        ELIMINAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        }
    </>
  )
};
