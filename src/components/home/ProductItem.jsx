import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Prices } from '../product/Prices';
import { API_URL } from '../../utils/constants';
import { addProductToCart } from '../../api/cartApi';
import { Alert } from '../utils/Alert';
import { addProductToFavorite, deleteFavoriteProduct, isFavoriteProduct } from '../../api/favoritesApi';

export const ProductItem = ({ product, auth }) => {
    
    const { title, main_image, price, discount, id} = product;
    const [isFavorite, setIsFavorite] = useState(null);
    const [isAddingToFavorite, setIsAddingToFavorite] = useState(false);
    const navigate = useNavigate();

    const addToCart = event => {
        event.preventDefault();
        if( auth ){
            addProductToCart(id, 1, product.stock);
            Alert('Añadido al carrito', 'Ya tenes tu producto en el carrito y listo para comprarlo', 'success');
        }
        else{
            navigate('/auth/login');
            Alert('Inicia sesión o regístrate para añadir el producto al carrito', '', 'info');
        }
    };

    const addToFavorite = async (event) => {
        event.preventDefault();
        if(!isAddingToFavorite){
            if(auth){
                setIsAddingToFavorite(true);
                setIsFavorite(true);
                const response = await addProductToFavorite(auth, product.id);
                if(!response){
                    Alert('Ocurrió un error al añadir a favoritos', '','error');
                    setIsFavorite(false);
                }
                setIsAddingToFavorite(false);
            }
            else{
                navigate('/auth/login');
                Alert('Inicia sesión o regístrate para añadir el producto al favoritos', '', 'info');
            }
        }
    };

    const removeToFavorite = async (event) => {
        event.preventDefault();
        if(!isAddingToFavorite){
            if(auth){
                setIsAddingToFavorite(true);
                setIsFavorite(false);
                const response = await deleteFavoriteProduct(auth, product.id);
                if(!response){
                    Alert('Ocurrió un error al eliminar de favoritos', '','error');
                    setIsFavorite(true);
                }
                setIsAddingToFavorite(false);
            }
            else{
                navigate('/auth/login');
                Alert('Inicia sesión o regístrate para añadir el producto al favoritos', '', 'info');
            }
        }
    }

    useEffect(() => {
        ( async () => {
            if(auth){
                const isAFavoriteProduct = await isFavoriteProduct(auth, product.id);
                if(isAFavoriteProduct.length > 0){
                    setIsFavorite(true);
                }
                else{
                    setIsFavorite(false);
                }
            }
        })();
    }, [product.id, auth]);
    
    return (
        <Link
            to={ `/product/${ id }` }
            className='products__link'
        >
            <div className="products__item">
                <img
                    src={ `${ API_URL }${ main_image?.formats?.small?.url }` }
                    alt={ title }
                    className='products__item_img'
                />
                <h5 className="products__item_title">
                    { title }
                </h5>
                <Prices price={ price } discount={ discount } />
                <div className="products__item_btn-container">
                    <button className="products__item_btn" onClick={ addToCart }>
                        <p className="products__item_btn_text">AÑADIR</p>
                        <ion-icon name="cart-outline"></ion-icon>
                    </button>
                </div>
            </div>
            <div className="products__is-favorite-icon">
            {
                isFavorite === null
                    ? <></>
                    :   isFavorite
                            ? <ion-icon name="heart-sharp" onClick={ isFavorite ? removeToFavorite : addToFavorite }></ion-icon>
                            : <ion-icon name="heart-outline" onClick={ isFavorite ? removeToFavorite : addToFavorite }></ion-icon>
                }
            </div>
        </Link>
    )
};

