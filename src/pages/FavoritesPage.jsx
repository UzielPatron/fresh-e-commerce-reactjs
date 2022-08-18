import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FavoriteItem } from '../components/account/FavoriteItem';
import { getFavoriteProducts } from '../api/favoritesApi';
import { UserContext } from '../context/UserContext';
import '../stylesheets/account/favorites.css';
import { Loading } from '../components/utils/Loading';
import { Header } from '../components/Header';
import { NotProducts } from '../components/account/NotProducts';

export const FavoritesPage = () => {
    
    const [favoriteProducts, setFavoriteProducts] = useState(null);
    const [refreshFavorites, setRefreshFavorites] = useState(false);
    const { auth } = useContext(UserContext);



    useEffect(() => {
        ( async () => {
            getFavoriteProducts(auth)
                .then(res => {
                    setFavoriteProducts(res);
                });
            setRefreshFavorites(false);
        })();

    }, [refreshFavorites]);

    return (
        <>
            <Header />
            <div className="account__favorites__container">
                {
                    favoriteProducts?.length > 0
                    &&
                    (<h2 className='account__favorites__container__title'>Favoritos</h2>)
                }
                <div className="account__favorites__grid">
                    {
                        !favoriteProducts
                            ? (
                                <Loading className='account__favorites__loading' />
                            )

                            : favoriteProducts.length > 0
                                ? (
                                favoriteProducts.map( ({ product }) => (
                                    <FavoriteItem
                                        key={ product.id }
                                        product={ product } 
                                        setRefreshFavorites={ setRefreshFavorites }
                                    />
                                ) )
                                )

                                : (
                                    <NotProducts name='favoritos' />
                                )
                    }
                </div>     
        </div>
        </>
    )
};
