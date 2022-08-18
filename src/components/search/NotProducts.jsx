import React from 'react';
import '../../stylesheets/account/notProducts.css';

export const NotProducts = ({ title }) => {
  return (
    <div className="account__favorites__notproducts">
        <ion-icon name="help-circle-outline"></ion-icon>
        <h3 className='account__favorites__notproducts-title'>Nada por acá...</h3>
    <p className='account__favorites__notproducts-text'>No hay productos que coincidan con tu búsqueda</p>

</div>
  )
};
