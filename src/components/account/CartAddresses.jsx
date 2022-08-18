import React from 'react'
import { CartAddressesList } from './CartAddressesList';
import '../../stylesheets/components/account/cartAddresses.css';

export const CartAddresses = ({ addresses, setRechargeAddresses, addressSelected, setAddressSelected }) => {
    
    return (
    <div className="addresses-container-cart">
            {
                !addresses
                    ? <></>
                    
                    :   <CartAddressesList
                            addresses={ addresses }
                            setRechargeAddresses={ setRechargeAddresses }
                            addressSelected={ addressSelected }
                            setAddressSelected={ setAddressSelected }
                        />
            }
    </div>
  )
};
