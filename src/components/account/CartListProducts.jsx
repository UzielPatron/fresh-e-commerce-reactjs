import React, { useEffect } from 'react';
import { getProductById } from '../../api/productsApi';
import { Loading } from '../utils/Loading';
import { CartItemProduct } from './CartItemProduct';

const calcPrice = (price, discount = 0) => {
    const finalPrice = ((100 - discount) * price) / 100;
    return finalPrice;
};

export const CartListProducts = ({ cart, setReloadCart, reloadCartList, setReloadCartList, productsInCart, setProductsInCart }) => {

    useEffect( () => {
        ( async () =>{
            const productList = [];
            for(const product of cart){
                getProductById(product.idProduct)
                    .then( res => {
                        productList.push({
                            ...res,
                            quantity: product.quantity,
                            unitPrice: calcPrice(res.price, res.discount)
                        });
                        if(productList.length === cart.length){
                            setProductsInCart(productList);
                        }
                    });
            };
            setReloadCartList(false);

        } )();
    }, [reloadCartList, cart]);
  
    return (
    <div className='account__cart__grid{'>
        {
            productsInCart
                ? (
                    productsInCart.map( product => (
                        <CartItemProduct
                            key={ product.id }
                            product={ product }
                            setReloadCart={ setReloadCart }
                            productsInCart={ productsInCart }
                            setProductsInCart={ setProductsInCart }
                        />
                    ))
                )
                : <Loading className='account__cart__loading' />
        }
    </div>
  )
};
