import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrderCartApi, deleteCart } from '../../api/cartApi';
import { UserContext } from '../../context/UserContext';
import '../../stylesheets/components/account/cartPayment.css';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';


const calcPrice = (price, discount = 0) => {
    const finalPrice = ((100 - discount) * price) / 100;
    const finalFinalPrice = finalPrice.toFixed(2).replace('.', ',');
    
    if(finalFinalPrice.length > 6 && finalFinalPrice.length <= 9 ){
        const lastPart = finalFinalPrice.slice(-6);
        const firstPart = finalFinalPrice.slice(0, -6);
        const finalFinalFinalPrice = `${ firstPart }.${ lastPart }`;
        
        return finalFinalFinalPrice;
    }
    if(finalFinalPrice.length > 9){
        const lastPart = finalFinalPrice.slice(-6);
        const secondPart = finalFinalPrice.slice(-9, -6);
        const firstPart = finalFinalPrice.slice(0, -9);
        const finalFinalFinalPrice = `${ firstPart }.${ secondPart }.${ lastPart }`;
        
        return finalFinalFinalPrice;
    }
    return finalFinalPrice;
};


export const PaymentCart = ({ productsInCart, addressSelected }) => {
    
    const [totalPayment, setTotalPayment] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const { auth } = useContext(UserContext);

    const navigate = useNavigate();
    
    const createNewOrder = async () => {
        setIsCreatingOrder(true);
        setOpenModal(false);
        const response = await createOrderCartApi(auth, productsInCart, addressSelected, totalPayment, 'efectivo');
        if(response){
            Alert('Pedido realizado', 'Tu pedido se ha realizado con éxito, pronto será enviado hasta tu domicilio', 'success');
            deleteCart();
            navigate('/account/orders');
        }
        else {
            Alert('No se pudo realizar el pedido', 'Ocurrió un error al intentar realizar el pedido, comprueba que estés conectado a internet o intenta nuevamente mas tarde', 'error');
            setIsCreatingOrder(false);
        }
    };

    useEffect(() => {
        if(productsInCart?.length > 0){
            let total = 0; 
            for( const product of productsInCart ){
                total += product.unitPrice * product.quantity;
            };
            setTotalPayment(total);
        };
        
    }, [productsInCart, addressSelected]);

    return (
        <>
            <div className="account-cart-payment-btn-container">
                <button
                    className={ `account-cart-payment-btn ${ addressSelected ? '' : 'btn-disabled' }` }
                    onClick={ () => {
                        if(addressSelected){
                            setOpenModal(true);
                        }
                        else Alert('Por favor añade una dirección para poder realizar el pedido','','warning');
                        } }
                    disabled={ isCreatingOrder || !productsInCart ? true : false }
                >
                    {
                        !isCreatingOrder && productsInCart
                            ? `REALIZAR PEDIDO ($${ calcPrice(totalPayment, 0) || '' })`
                            : <div className="account-cart-payment-btn-loading"><Loading /></div>
                    }
                </button>
            </div>
            <div className={ `account-cart-modal-payment-container ${ !openModal ? 'display-none' : '' }` } >
                <div className="account-cart-modal-payment">
                    <h5>Realizar pedido</h5>
                    <p>Estás por realizar el pedido de { productsInCart?.length } { productsInCart?.length === 1 ? 'producto' : 'productos' }, ¿Estás seguro?</p>
                    <div className="account-cart-modal-payment-option-btn-container">
                        <button className="account-cart-modal-payment-option-btn" onClick={ () => setOpenModal(false) } >
                            NO
                        </button>
                        <button className="account-cart-modal-payment-option-btn" onClick={ createNewOrder }>
                            SI
                        </button>
                    </div>
                </div>
            </div>
        </>
  )
};
