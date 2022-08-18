import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../api/cartApi';
import { deleteFavoriteProduct } from '../../api/favoritesApi';
import { UserContext } from '../../context/UserContext';
import { API_URL } from '../../utils/constants';
import { Prices } from '../product/Prices';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';

export const FavoriteItem = ({ product, setRefreshFavorites }) => {
   
    const { auth } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    
    const deleteFavorite = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await deleteFavoriteProduct(auth, product.id)
        if(response){
            Alert('Producto eliminado de favoritos', '', 'success');
            setRefreshFavorites(true);
        }
        else Alert('Error al eliminar', 'No se pudo eliminar el producto de favoritos', 'error');
        setLoading(false);
    };

    const addFavoriteProductToCart = (e) => {
        e.preventDefault();
        addProductToCart(product.id, 1, product.stock);
        Alert('Producto añadido a favoritos', '', 'success');
    }; 

    return (
    <>{ loading
            ? <div className="favorites-loading"><Loading /></div>

            :   <Link
                    to={ `/product/${ product.id }` }
                    className="account__favorites__card"
                >
                    <div className="account__favorites__card__image-container">
                        <img src={ `${ API_URL }${ product?.main_image?.formats?.small?.url }` } alt={ product.title } className="account__favorites__card__image" />
                    </div>
                    <div className="account__favorites__card__data-container">
                        <div className="account__favorites__card__data__info">
                            <h5 className="account__favorites__card__data__title">
                                { product.title }
                            </h5>
                            <Prices price={ product.price } discount={ product.discount } />
                        </div>
                        <div className="account__favorites__card__data__info-mobile">
                            <h5 className="account__favorites__card__data__title-mobile">
                                { `${ product.title.substring(0, 30).trim() }${ product.title.length > 30 ? '...' : '' }` }
                            </h5>
                            <Prices price={ product.price } discount={ product.discount } />
                        </div>
                        <div className="account__favorites__card__data__btns">
                            <div className="account__favorites__card__data__btnAddToCart-container">
                                <button
                                    className="account__favorites__card__data__btnAddToCart account__favorites__card__data__btn"
                                    disabled={ loading }
                                    onClick={ addFavoriteProductToCart }
                                >
                                    SUMAR AL CARRITO
                                </button>
                            </div>
                            <div className="account__favorites__card__data__btnDeleteFavorite-container">
                                <button
                                    className="account__favorites__card__data__btnDeleteFavorite account__favorites__card__data__btn"
                                    onClick={ deleteFavorite }
                                    disabled={ loading }
                                >
                                    ELIMINAR
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
      }  
    </>
  )
};
