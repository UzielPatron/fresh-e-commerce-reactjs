import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLatestProducts, getProductsInOffert, getBannerImages, getNumberOfProductsInOffer, getNumberOfAllProducts  } from '../api/productsApi.js';
import { Header } from '../components/Header.jsx';
import { ProductList, Slider } from '../components/home';
import { Loading } from '../components/utils/Loading.jsx';
import '../stylesheets/pages/homepage.css';

export const HomePage = () => {

    const [images, setImages] = useState(null);
    const [productsInOffert, setProductsInOffert] = useState(null);
    const [latestProducts, setLatestProducts] = useState(null);
    const [offerProductPage, setOfferProductPage] = useState(0);
    const [loadingOfferProducts, setLoadingOfferProducts] = useState(false);
    const [maxNumberOfOfferProducts, setMaxNumberOfOfferProducts] = useState(0);
    const [latestProductPage, setLatestProductPage] = useState(0);
    const [loadingLatestProducts, setLoadingLatestProducts] = useState(false);
    const [maxNumberOfLatestProducts, setMaxNumberOfLatestProducts] = useState(0);

    const handleSeeMoreOffer = () => {
        setLoadingOfferProducts(true);
        const page = offerProductPage + 1;
        
        getProductsInOffert(page, 8)
            .then( res => {
                const newProducts = [];
                newProducts.push(...productsInOffert, ...res);
                setProductsInOffert(newProducts);
                setOfferProductPage( page );
                setLoadingOfferProducts(false);
            });

    };


    const handleSeeMoreLatest = () => {
        setLoadingLatestProducts(true);
        const page = latestProductPage + 1;
        
        getLatestProducts(page, 8)
            .then( res => {
                const newProducts = [];
                newProducts.push(...latestProducts, ...res);
                setLatestProducts(newProducts);
                setLatestProductPage( page );
                setLoadingLatestProducts(false);
            });

    };


    useEffect(() => {
        ( () =>{

            getProductsInOffert(offerProductPage, 8)
                .then( res => setProductsInOffert(res));

            getBannerImages()
                .then(res => setImages(res));

            getLatestProducts(latestProductPage, 8)
                .then(res => setLatestProducts(res));

            getNumberOfProductsInOffer()
                .then( res => setMaxNumberOfOfferProducts(res));

            getNumberOfAllProducts()
                .then( res => setMaxNumberOfLatestProducts(res));

        })();
    }, []);

    return (
        <>
            <Header />
            {
                (images?.desktop?.length > 0 || images?.mobile?.length > 0 || productsInOffert || latestProducts)
                    ?   <div className="home-container">
                            <div className="home">
                                <div className="home__slider">
                                {
                                    images && <Slider images={ images } />
                                }
                                </div>
                                <div className="home__products">
                                    <div className="products-in-offer">
                                    {
                                        productsInOffert && <ProductList products={ productsInOffert } title='Productos en oferta' />
                                    }
                                    <div className='products-view-more' >
                                    {
                                        productsInOffert
                                            &&
                                        maxNumberOfOfferProducts > ((offerProductPage + 1) * 8)
                                            &&
                                        (
                                            <button onClick={ handleSeeMoreOffer } >
                                                {
                                                    loadingOfferProducts ? <Loading /> : 'MOSTRAR MÁS'
                                                }
                                            </button>
                                        )
                                    }
                                    </div>
                                    </div>
                                    <div className="home__products-latest">
                                    {
                                        latestProducts && <ProductList products={ latestProducts } title='Nuevos productos' />
                                    }
                                    </div>
                                    <div className='products-view-more' >
                                    {
                                        maxNumberOfLatestProducts > ((latestProductPage + 1) * 8)
                                            &&
                                        latestProducts
                                            &&
                                        (
                                            <button onClick={ handleSeeMoreLatest } >
                                                {
                                                    loadingLatestProducts ? <Loading /> : 'MOSTRAR MÁS'
                                                }
                                            </button>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>

                    :   <div className="home-loading"><Loading /></div>   
            }
        </>
    )
};
