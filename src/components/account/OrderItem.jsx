import React, { useState } from 'react';
import { deleteAnOrder } from '../../api/orderApi';
import { API_URL } from '../../utils/constants';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';


const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const getOrderDate = (date) => {
    const formatedDate = date.substring(0,10).split('-');
    return `${ formatedDate[2] } de ${ meses[ parseInt(formatedDate[1]) ] } de ${ formatedDate[0] }`
};

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


export const OrderItem = ({ order, auth, setRechargeOrderList }) => {
    const { createdAt, products, amounts, quantity, paymentMethod, state, totalPayment } = order;
    const [isDeletingOrder, setIsDeletingOrder] = useState(false);
    
    const deleteOrder = async () => {
        setIsDeletingOrder(true);
        const response = await deleteAnOrder(auth, order.id);
        if(response){
            Alert('Pedido cancelado correctamente','','success');
            setRechargeOrderList(true);
        }
        else Alert('Ocurrió un error al intentar cancelar el pedido','Comprueba que tienes acceso a internet e intenta nuevamente','error');
        setIsDeletingOrder(false);
    }

    return (
    <div className="account-orders-item-container">
        <h5 className="account-orders-item-date">
            { getOrderDate( createdAt ) }
        </h5>
        <div className="account-order-item-product-list">
            {
                products.map( product => (
                    <div className="account-order-item-product-container" key={ product.id }>
                        <div className="account-order-item-product-image">
                            <img src={ `${ API_URL }${ product?.main_image?.formats?.small?.url }` } alt={ product.title } />
                        </div>
                        <div className="account-order-item-product-data">
                            <h6>
                                { `${ product.title.substring(0, 30).trim() }${ product.title.length > 30 ? '...' : ''}` }
                            </h6>
                            <p>
                                Cantidad: { quantity?.[ product.id ] } x ${ calcPrice(amounts?.[ product.id ]) } c/u
                            </p>
                        </div>
                    </div>
                ) )
            }
        </div>
        <p className="account-orders-item-p" >Método de pago: <span>{ `${ paymentMethod.substring(0,1).toUpperCase() }${ paymentMethod.substring(1) }(al recibir el pedido)` }</span></p>
        <p className="account-orders-item-p" >
            Estado:
                <strong className={ `${ state === 'ENVIO PENDIENTE' ? 'account-order-pending' : '' }` } >
                    { ` ${state}` }
                </strong>
        </p>
        <div className={`account-order-item-cancel-btn-container ${ state === 'ENVIO PENDIENTE' ? '' : 'display-none' }`} >
            <button className="account-order-item-cancel-btn" onClick={ deleteOrder } >
                CANCELAR PEDIDO
            </button>
        </div>
        <div className="account-order-item-total-container">
            <p>Total: <span>${ `${ calcPrice(totalPayment, 0) }` }</span></p>
        </div>
        <div className={ `account-order-item-deleting ${ isDeletingOrder ? 'is-deleting-order' : '' }` }>
            <Loading />
        </div>
    </div>
  )
}
