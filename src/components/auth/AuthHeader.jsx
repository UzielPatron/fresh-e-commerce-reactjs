import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../../stylesheets/components/auth/authHeader.css';

export const AuthHeader = () => {
    return (
        <>
        <div className="auth__header-container">
            <Link to='/' className="auth__header__logo">
                <img src={ logo } alt="FreshLogo" className="auth__header__logo__img" />
            </Link>
        </div>
        <div className="auth__divisor"></div>
        </>
    )
};
