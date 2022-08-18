import React, { useState, useContext, useEffect  } from 'react';
import { UserContext } from '../../context/UserContext';
import { getOrders } from '../../api/orderApi';
import { Header } from '../../components/Header';
import '../../stylesheets/pages/account/ordersPage.css';
import { Loading } from '../../components/utils/Loading';
import { OrderItem } from '../../components/account/OrderItem';


export const Orders = () => {
    
    const { auth } = useContext( UserContext );
    const [orderList, setOrderList] = useState(null);
    const [rechargeOrderList, setRechargeOrderList] = useState(false);

    useEffect(() => {
        ( async () => {
            const response = await getOrders(auth);
            setOrderList(response);
            setRechargeOrderList(false);
        })();
    }, [auth, rechargeOrderList]);
  
    return (
    <>
        <Header />
        <div className="account-orders-container">
            {
                !orderList
                    ? <div className="orders-loading-container"><Loading /></div>
                    : orderList.length < 1
                        ?   <div className="orders-not-orders">
                                <ion-icon name="help-circle-outline"></ion-icon>
                                <p>Nada por acá...</p>
                            </div>
                        
                        :   <div className="account-orders">
                            <h3>Mis pedidos</h3>
                            {
                                orderList.map( order => (
                                    <OrderItem key={ order.id } order={ order } auth={ auth } setRechargeOrderList={ setRechargeOrderList } />
                                ) )
                            }
                            </div>
            }
        </div>
    </>
  )
};