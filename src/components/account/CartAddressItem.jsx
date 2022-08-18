import React from 'react';

export const CartAddressItem = ({ address, addressSelected, setAddressSelected }) => {
    const { title, name_lastname, city, state, phone } = address;
    
    return (
    <div
        className={ `account-cart-addresses-address-item-container ${ addressSelected?.id === address?.id ? 'cart-address-selected' : '' }` }
        onClick={ () => setAddressSelected(address) }
    >
        <div className="addresses-address-item-data">
            <h5 className="addresses-address-item-title">{ title }</h5>
            <p>{ name_lastname }</p>
            <p>{ address.address }</p>
            <p>{ city }, { state }</p>
            <p>Teléfono: { phone }</p>
        </div>
    </div>
  )
};
