import React, { useContext, useState } from 'react';
import logo from '../assets/icon.png';
import logoWithName from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Alert } from './utils/Alert';
import { NavLink } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import '../stylesheets/components/header.css';



export const Header = () => {
    const [isDesktop, setIsDesktop] = useState(document.documentElement.clientWidth > 600 ? true : false);
    const navigate = useNavigate();
    const [isFocusSearch, setIsFocusSearch] = useState(false);
    const [openNavModal, setOpenNavModal] = useState(false);
    const { auth, logout } = useContext(UserContext);

    const onSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value.trim();
        if(searchValue.length < 2) Alert('Introduce al menos 2 caracteres', '', 'info')
        else return navigate(`/search/${ searchValue }`);
    };

    const closeSession = () => {
        if(auth){
            logout();
            navigate('/auth/login');
        }
        else {
            navigate('/auth/login')
        }
        
    }


    useEffect(() => {
        const compIsDesktop = () => {
            if( document.documentElement.clientWidth >= 600 && !isDesktop){
                setIsDesktop(true);
            }
            else if( document.documentElement.clientWidth < 600 && isDesktop ) setIsDesktop(false);
        }
        
        window.addEventListener('resize', compIsDesktop)
        return () => {
            window.removeEventListener('resize', compIsDesktop);
        };
    }, [isDesktop]);

    return (
    <div className="header-container">
        <div className='header' >
            <Link to='/' className="header__logo">
                <img src={ isDesktop ? logoWithName : logo } alt="Fresh" className="header__logo__img" />
            </Link>
            <div className="header__search">
                <form
                    onSubmit={ (e) => {
                        onSearch(e);
                        e.target.search.value = '';
                } }
                    className={ `header__search__input ${ isFocusSearch ? 'focus-color' : '' }` }
                >
                        <ion-icon name="search-outline"></ion-icon>
                        <input
                            name='search'
                            type="text"
                            className="header__search__input__input"
                            placeholder='Busca un producto'
                            onFocus={ () => setIsFocusSearch(true) }
                            onBlur={ () => setIsFocusSearch(false) }
                        />
                </form>
            </div>
            <div className="header__menu">
                { 
                    openNavModal
                        ? <ion-icon name="close-outline" onClick={ () => setOpenNavModal(false) } ></ion-icon>
                        : <ion-icon name="menu-outline" onClick={ () => setOpenNavModal(true) } ></ion-icon>
                  
                }
                <nav className="header__nav">
                    <ul>
                        <li>
                            <NavLink to='/account/cart' className='header__nav__link' >
                                <ion-icon name="cart"></ion-icon>  
                                <p>Carrito</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/account/favorites' className='header__nav__link' >
                                <ion-icon name="heart-circle-sharp"></ion-icon>
                                <p>Favoritos</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/account/my-account' className='header__nav__link' >
                                <ion-icon name="person-circle-sharp"></ion-icon>
                                <p>Mi cuenta</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {
                    openNavModal && (
                        <nav className="header__nav__responsive">
                            <ul>
                                <li>
                                    <NavLink to='/account/cart' className='header__nav__link__responsive' >
                                        <ion-icon name="cart-outline"></ion-icon> 
                                        <p>Carrito</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/account/favorites' className='header__nav__link__responsive' >
                                        <ion-icon name="heart-outline"></ion-icon>
                                        <p>Favoritos</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/account/my-account' className='header__nav__link__responsive' >
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                        <p>Mi cuenta</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/account/addresses' className='header__nav__link__responsive' >
                                        <ion-icon name="map-outline"></ion-icon>
                                        <p>Mis direcciones</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/account/orders' className='header__nav__link__responsive' >
                                        <ion-icon name="bag-outline"></ion-icon>
                                        <p>Mis pedidos</p>
                                    </NavLink>
                                </li>
                                <button className={ `header__nav__close-session ${ auth ? '' : 'header__nav__login-session' }` } onClick={ closeSession } >
                                    {
                                        auth
                                            ? (
                                                <>
                                                    <ion-icon name="exit-outline"></ion-icon>
                                                    Cerrar sesión
                                                </>
                                            )

                                            : (
                                                <>
                                                    <ion-icon name="log-in-outline"></ion-icon>
                                                    Iniciar sesión
                                                </>
                                            )
                                    }
                                </button>
                        
                            </ul>
                        </nav>
                    )
                }

            </div>
        </div>
    </div>
  )
};
