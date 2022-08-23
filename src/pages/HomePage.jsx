import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLatestProducts, getProductsInOffert, getBannerImages  } from '../api/productsApi.js';
import { Header } from '../components/Header.jsx';
import { ProductList, Slider } from '../components/home';
import { Loading } from '../components/utils/Loading.jsx';
import '../stylesheets/pages/homepage.css';

export const HomePage = () => {

    const [images, setImages] = useState(null);
    const [productsInOffert, setProductsInOffert] = useState(null);
    const [latestProducts, setLatestProducts] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        ( () =>{

            getProductsInOffert(page, 8)
                .then( res => setProductsInOffert(res));

            getBannerImages()
                .then(res => setImages(res));

            getLatestProducts(page, 8)
                .then(res => setLatestProducts(res));

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
                                        <button>
                                            {
                                                true ? 'MOSTRAR MÁS' : <Loading />
                                            }
                                        </button>
                                    </div>
                                    </div>
                                    <div className="home__products-latest">
                                    {
                                        latestProducts && <ProductList products={ latestProducts } title='Nuevos productos' />
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
