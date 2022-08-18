import React, { useEffect, useState } from 'react';
import { AddAddressForm } from './AddAddressForm';
import { CartAddressItem } from './CartAddressItem';

export const CartAddressesList = ({ addresses, setRechargeAddresses, addressSelected, setAddressSelected }) => {
    
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        addresses && setAddressSelected(addresses[0]);
    }, [addresses]);

    return (
        <>
        <h4 className='account-cart-addresses-title'>Mis direcciones</h4>
        {
            addresses.length < 1
                ?   <>
                        <div className="addresses-not-addresses">
                            <p>Aun no tienes direcciones, añade una dirección para poder realizar el pedido</p>
                        </div>
                        <div className="addresses-add-address-container" onClick={ openModal } >
                            <div className="addresses-add-address-btn-container">
                                <p>Añadir una dirección</p>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                        </div>
                    </>
                : addresses.map( address => (
                    <CartAddressItem key={ address.id } address={ address } addressSelected={ addressSelected } setAddressSelected={ setAddressSelected } />
                 ) )
        }
        
        {
            isOpenModal && <AddAddressForm closeModal={ closeModal } setRechargeAddresses={ setRechargeAddresses } />
        }
    </>
  )
}
