import React, { useState } from 'react';
import { AddAddressForm } from './AddAddressForm'
import { AddressItem } from './AddressItem';

export const AddressesList = ({ addresses, setRechargeAddresses }) => {
    
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    
    return (
    <>
        <h4 className='addresses-title'>Mis direcciones</h4>
        {
            addresses.length < 1
                ?   <>
                        <div className="addresses-not-addresses">
                            <ion-icon name="help-circle-outline"></ion-icon>
                            <p>Aun no tienes direcciones</p>
                        </div>
                    </>
                : addresses.map( address => (
                    <AddressItem key={ address.id } address={ address } setRechargeAddresses={ setRechargeAddresses } />
                 ) )
        }
        <div className="addresses-add-address-container" onClick={ openModal } >
            <div className="addresses-add-address-btn-container">
                <p>Añadir una dirección</p>
                <ion-icon name="add-outline"></ion-icon>
            </div>
        </div>
        
        {
            isOpenModal && <AddAddressForm closeModal={ closeModal } setRechargeAddresses={ setRechargeAddresses } />
        }
    </>
  )
}
