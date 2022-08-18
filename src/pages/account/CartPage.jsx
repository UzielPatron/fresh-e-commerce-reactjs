import React, { useState, useEffect, useContext }  from 'react';
import { getAllAddresses } from '../../api/accountApi';
import { getProductsInCart } from '../../api/cartApi';
import { CartAddresses } from '../../components/account/CartAddresses';
import { CartListProducts } from '../../components/account/CartListProducts';
import { NotProducts } from '../../components/account/NotProducts';
import { PaymentCart } from '../../components/account/PaymentCart';
import { Header } from '../../components/Header';
import { Loading } from '../../components/utils/Loading';
import { UserContext } from '../../context/UserContext';
import '../../stylesheets/pages/account/cart.css'

export const CartPage = () => {
    
    const { auth } = useContext(UserContext);

    const [cart, setCart] = useState(null);
    const [productsInCart, setProductsInCart] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [reloadCartList, setReloadCartList] = useState(false);
    const [addressSelected, setAddressSelected] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const [rechargeAddresses, setRechargeAddresses] = useState(false);

    
    useEffect(() => {
        const cartProducts = getProductsInCart();
        setCart(cartProducts);
        setReloadCart(false);
        setReloadCartList(true);
        ( async() => {
            const response = await getAllAddresses(auth);
            setAddresses(response);
            setRechargeAddresses(false);
        })();
    }, [reloadCart, rechargeAddresses, auth]);

    
    return (
    <>
        <Header />
        <div className="account__cart__container">
            {
                cart?.length > 0
                &&
                (<h2 className='account__cart__container__title'>Carrito</h2>)
            }
            <div className="account__cart__grid">
                {
                    !cart || !addresses
                        ? (
                            <Loading className='account__cart__loading' />
                        )

                        : cart.length > 0
                            ? (
                            <>
                                <CartListProducts
                                    cart={ cart }
                                    setReloadCart={ setReloadCart }
                                    reloadCartList={ reloadCartList }
                                    setReloadCartList={ setReloadCartList } 
                                    productsInCart={ productsInCart }
                                    setProductsInCart={ setProductsInCart } 
                                />
                                <CartAddresses
                                    addresses={ addresses }
                                    setRechargeAddresses={ setRechargeAddresses }
                                    addressSelected={ addressSelected }
                                    setAddressSelected={ setAddressSelected }
                                />
                                <PaymentCart
                                    auth={ auth }
                                    productsInCart={ productsInCart }
                                    addressSelected={ addressSelected }
                                    reloadCart={ reloadCart }
                                />
                            </>
                            )

                            : (
                                <NotProducts name='el carrito' />
                            )
                }
            </div>     
        </div>
    </>
  )
};
