import React from 'react';
import '../../stylesheets/account/notProducts.css';

export const NotProducts = ({ name }) => {
  return (
    <div className="account__favorites__notproducts">
        <ion-icon name="help-circle-outline"></ion-icon>
        <h3 className='account__favorites__notproducts-title'>Nada por acá...</h3>
        <p className='account__favorites__notproducts-text'>Aún no tenes productos en { name ? name : 'favoritos' } </p>
    </div>
  )
};
