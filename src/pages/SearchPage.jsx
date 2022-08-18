import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSearchProducts } from '../api/productsApi';
import { Header } from '../components/Header';
import { ProductList } from '../components/home/ProductList';
import { NotProducts } from '../components/search/NotProducts';
import { Loading } from '../components/utils/Loading';



export const SearchPage = () => {

    const { searchValue } = useParams();
    const [searchProducts, setSearchProducts] = useState(null);

    useEffect(() => {
        ( async () => {
            getSearchProducts(searchValue)
                .then( res => setSearchProducts(res));
        })();
    }, [searchValue]);


    return (
        <>
            <Header />
            <div className="home__products">
            {
                !searchProducts
                    ? (
                        <div style={ styles.loadingContainer } className="search-page-loading">
                            <Loading />
                        </div>
                    )
                    : searchProducts.length < 1
                        ? <NotProducts title={ `${searchValue[0].toUpperCase() }${ searchValue.slice(1).toLowerCase() }` }/>
                        : <ProductList products={ searchProducts } title={ `${searchValue[0].toUpperCase() }${ searchValue.slice(1).toLowerCase() }` } />
            }
            </div>
        </>
  )
};


const styles = {
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    }
};