import React, { useContext, useEffect, useState } from 'react';
import { getAccountData } from '../../api/accountApi';
import { AccountData } from '../../components/account/AccountData';
import { Header } from '../../components/Header';
import { Loading } from '../../components/utils/Loading';
import { UserContext } from '../../context/UserContext';
import '../../stylesheets/pages/account/my-account.css';


export const MyAccountPage = () => {
    
    const [user, setUser] = useState();
    const { auth, logout } = useContext( UserContext );

    useEffect(() => {
        ( async () => {
            const response = await getAccountData(auth.token);
            setUser(response);
        })();
    }, []);

    return (
        <>
            <Header />
            {
                !user
                    ? ( <div className="loading-user"><Loading /></div> )
                    : (
                        <div className="my-account-container">
                            <h3 className="my-account-title">
                                Bienvenido
                                    <strong className="my-account-title-name" >
                                        { ` ${ user.name || ''} ${ user.lastname || '' }` }!
                                    </strong>
                                </h3>
                            <AccountData user={ user } auth={ auth } logout={ logout && logout } />
                        </div>
                    )
            } 
            
        </>
    );
};