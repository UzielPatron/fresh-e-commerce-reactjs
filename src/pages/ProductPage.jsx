import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../api/productsApi.js';
import { API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom'
import { RelatedProducts } from '../components/product/RelatedProducts';
import { addProductToFavorite, deleteFavoriteProduct, isFavoriteProduct } from '../api/favoritesApi.js';
import { UserContext } from '../context/UserContext.jsx';
import { Header } from '../components/Header.jsx';
import { Alert } from '../components/utils/Alert.jsx';
import { Quantity } from '../components/product/Quantity.jsx';
import { AddToCartButton } from '../components/product/AddToCartButton.jsx';
import { Loading } from '../components/utils/Loading.jsx';
import '../stylesheets/pages/productPage.css';


export const ProductPage = () => {
    
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [changingProduct, setChangingProduct] = useState(false);
    const { productId } = useParams();
    const { auth } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setRelatedProducts(null);
        setChangingProduct(true);
        ( async () => {
            // const tempProduct = await getProductById(productId);
            getProductById(productId)
                .then(res => {
                    if(res !== 'no-ok') setProduct(res)
                    else return navigate('/');
                    
                    setChangingProduct(false);
                    const productTag = res.tags.split(',')[0];

                    getRelatedProducts(productTag, res.id, 3)
                        .then(res => setRelatedProducts(res));
                });
            // if(tempProduct !== 'no-ok'){
            //     setProduct(tempProduct);
            // }
            // else{
            //     return navigate('/');
            // }
            setQuantity(1);
            
            

        })();
    }, [productId, auth]);


    useEffect(() => {
        ( async () => {
            if(auth){
                isFavoriteProduct(auth, productId)
                    .then( res => {
                        if(res.length > 0) setIsFavorite(true)
                        else setIsFavorite(false);
                    });
            }
        })();
    }, [isFavorite, productId, auth]);


    const addToFavorite = async () => {
        setLoadingFavorite(true);
        if( auth ){
            const response = await addProductToFavorite(auth, productId)
            if( response ) setIsFavorite(true);
            else Alert('Error', 'No se ha podido añadir el producto a favoritos');
            setLoadingFavorite(false);
            Alert('Producto añadido a favoritos', '', 'success');
        }else {
            navigate('/auth/login');
            Alert('Inicia sesión o regístrate para añadir el producto a favoritos', '', 'info');
        }
    };

    const removeToFavorite = async () => {
        setLoadingFavorite(true);
        const response = await deleteFavoriteProduct(auth, productId)
        if( response ){
            setIsFavorite(false);
            Alert('Producto eliminado de favoritos', '', 'success');
        }
        else Alert('Error', 'No se ha podido eliminar el producto de favoritos');
        setLoadingFavorite(false);
    };

    if(!product) return <></>;

    return (
        <>
            <Header />
            <div className="product-container">
                <div className="related-products-desktop">
                    {
                        relatedProducts && <RelatedProducts products={ relatedProducts }/>
                    }
                </div>
                
                {
                    changingProduct
                        ?   <div className="product__loading__container">
                                <Loading />
                            </div>

                            
                        :   <>
                                <div className="product">
                                    <div className="product__title">
                                        { product.title }
                                    </div>
                                    <div className="product__image-container">
                                        <img src={ `${ API_URL }${ product?.main_image?.formats?.medium?.url }` } alt="" className="product__image" />
                                    </div>
                                    <div className="product__data-container">
                                        <div className="product__data_title">
                                            { product.title }
                                        </div>
                                        <div className="product__data_price">
                                            <Prices
                                                price={ product.price }
                                                discount={ product.discount }
                                            />
                                        </div>
                                        <div className="product__btns-container">
                                            <Quantity
                                                quantity={ quantity }
                                                setQuantity={ setQuantity }
                                                stock={ product?.stock }
                                            />
                                            <AddToCartButton
                                                idProduct={ product.id }
                                                quantity={ quantity }
                                                stock={ product.stock }
                                                auth={ auth }
                                            />
                                            <button
                                                className={ `product__btns_addToFavorites ${ isFavorite ? 'favorite' : 'not-favorite'} ${ loadingFavorite && 'loading' }` }
                                                onClick={ isFavorite ? removeToFavorite : addToFavorite }
                                                disabled={ loadingFavorite }
                                            >
                                                <p className='product__btns_addToFavorites_text'>
                                                    { isFavorite ? 'ELIMINAR DE FAVORITOS' : 'AÑADIR A FAVORITOS'}
                                                </p>
                                                <ion-icon name="heart-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="related-products-mobile">
                                    {
                                        relatedProducts && <RelatedProducts products={ relatedProducts }/>
                                    }
                                </div>
                            </>
                }
            </div>
        </>
    )
};



const calcPrice = (price, discount = 0) => {
    const finalPrice = ((100 - discount) * price) / 100;
    const finalFinalPrice = finalPrice.toFixed(2).replace('.', ',');
    if(finalFinalPrice.length > 6){
        const lastPart = finalFinalPrice.slice(-6);
        const firstPart = finalFinalPrice.slice(0, -6);
        const finalFinalFinalPrice = `${ firstPart }.${ lastPart }`;
        return finalFinalFinalPrice;
    }
    return finalFinalPrice;
};

const Prices = ({ price, discount = 0 }) => {
    const previousPrice = calcPrice(price, 0);
    const actualPrice = calcPrice(price, discount);
    
    return (
        <div className="products__price-container">
            {
                discount > 0
                    ? (
                        <>
                            <div className="products__price-and-discount">
                                <p className='products__price'>${ actualPrice }</p>
                                <p className='products__previous-price'>${ previousPrice }</p>
                            </div>
                            <p className='products__discount'>{ discount }% OFF</p>
                        </>
                    )

                    : (
                        <p className="products__price">
                            ${ calcPrice(price, 0) }
                        </p>
                    ) 
            }
        </div>
  )
};