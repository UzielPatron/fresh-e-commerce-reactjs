import React, { useState, useEffect, useContext} from 'react';
import { getAllAddresses } from '../../api/accountApi';
import { AddressesList } from '../../components/account/AddressesList';
import { Header } from '../../components/Header';
import { Loading } from '../../components/utils/Loading';
import { UserContext } from '../../context/UserContext';
import '../../stylesheets/pages/account/addressesPage.css';

export const AddressesPage = () => {

    const { auth } = useContext(UserContext);
    const [addresses, setAddresses] = useState(null);
    const [rechargeAddresses, setRechargeAddresses] = useState(false);

    useEffect(() => {
        ( async () => {
            const response = await getAllAddresses(auth);
            setAddresses(response);
            setRechargeAddresses(false);
        })();
    }, [auth, rechargeAddresses]);

    
    return (
    <>
        <Header />
        <div className="addresses-container">
            {
                !addresses
                    ? <div className="loading-addresses"><Loading /></div>
                    : <AddressesList addresses={ addresses } setRechargeAddresses={ setRechargeAddresses } />
            }
        </div>
    </>
  )
};
