import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { HomePage, LoginPage, RegisterPage, ProductPage, FavoritesPage,  } from './pages';
import { AddressesPage } from './pages/account/AddressesPage';
import { CartPage } from './pages/account/CartPage';
import { MyAccountPage } from './pages/account/MyAccountPage';
import { Orders } from './pages/account/Orders';
import { SearchPage } from './pages/SearchPage';


const App = () => {
    const { auth } = useContext( UserContext );
    return (
        <>  
            <Routes>
                <Route  path='/' element={ <HomePage /> } />
                <Route path='/product/:productId' element={ <ProductPage /> } />
                <Route path='/search/:searchValue' element={ <SearchPage /> } />

                {
                    auth
                        ? (
                            <>
                                <Route path='/account/favorites' element={ <FavoritesPage /> } />
                                <Route path='/account/cart' element={ <CartPage /> } />
                                <Route path='/account/my-account' element={ <MyAccountPage /> } />
                                <Route path='/account/addresses' element={ <AddressesPage /> } />
                                <Route path='/account/orders' element={ <Orders /> } />
                            </>
                        )

                        : (
                            <>
                                <Route path='/auth/login' element={ <LoginPage /> } />
                                <Route path='/auth/register' element={ <RegisterPage /> } />
                                <Route path='/account/*' element={ <Navigate to='/auth/login' /> } />
                            </>
                        )
                }

        
               
                
                   
                <Route path='*' element={ <Navigate to='/' /> } />
            </Routes> 
        </>
    );
};

export default App;
