import React, { useContext } from 'react'
import { useState } from 'react';
import { deleteAnAddress } from '../../api/accountApi';
import { UserContext } from '../../context/UserContext';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';

export const AddressItem = ({ address, setRechargeAddresses }) => {
    const { title, name_lastname, city, state, phone } = address;
    const { auth } = useContext( UserContext );
    const [isDeleting, setIsDeleting] = useState(false);
    
    const deleteAddress = async () => {
        setIsDeleting(true);
        const response = await deleteAnAddress(auth, address.id);
        if(response) setRechargeAddresses(true);
        else Alert('No se pudo eliminar la dirección', 'Por favor, inténtalo nuevamente mas tarde', 'error');
        setIsDeleting(false);
    };
    
    return (
    <div className="addresses-address-item-container">
        <div className="addresses-address-item-data">
            <h5 className="addresses-address-item-title">{ title }</h5>
            <p>{ name_lastname }</p>
            <p>{ address.address }</p>
            <p>{ city }, { state }</p>
            <p>Teléfono: { phone }</p>
        </div>
        <div className="addresses-address-item-btn-container">
            <button className="addresses-address-item-btn-delete" onClick={ deleteAddress } disabled={ isDeleting } >
                ELIMINAR
            </button>
        </div>
        <div className={ `is-deleting-container ${ !isDeleting ? 'non-display' : 'yes-display'  }` } >
            <Loading className='is-deleting-loading' />
        </div>
    </div>
  )
};
