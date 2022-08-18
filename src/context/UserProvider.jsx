import React, { useState, useMemo, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserContext } from './UserContext';
import { TOKEN } from '../utils/constants';


export const UserProvider = ({ children }) => {
  
    const [auth, setAuth] = useState(null);
  
    useEffect(() => {
        const token = localStorage.getItem(TOKEN);
        if(token) setAuth({
            token,
            idUser: jwtDecode(token).id,
        })
        else setAuth(null);
    }, []);

    
    
    const login = (user) => {
        localStorage.setItem(TOKEN, user.jwt);
        setAuth({
            token: user.jwt,
            idUser: user.user._id,
        });
    };

    const logout = () => {
        if(auth){
            localStorage.removeItem(TOKEN);
            setAuth(null);
        }
    };
   
    
    const authData = useMemo(
        () => ({
            auth,
            login,
            logout,
        }), 
        [auth]
    );
    
    return (
        <UserContext.Provider value={ authData }>
            { children }
        </UserContext.Provider>
  )
}
