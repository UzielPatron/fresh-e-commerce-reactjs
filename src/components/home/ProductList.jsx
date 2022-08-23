import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../context/UserContext';
import { ProductItem } from './ProductItem';
import '../../stylesheets/components/home/productList.css';

export const ProductList = ({ products, title='Productos' }) => {
    
    const { auth } = useContext(UserContext);
    const [productsToShow, setProductsToShow] = useState(null);

    useEffect(() => {
      setProductsToShow(products);
    }, [products]);
    

    return (
        <div className="products">
            <h2 className='products__title'>{ title }</h2>
            <div className="products__grid">
            {
                productsToShow?.length > 0
                    &&
                productsToShow.map( product => (
                    <ProductItem
                        key={product.id}
                        product={ product }
                        auth={ auth }
                    />
                ))
            }
            </div>
        </div>
    )
};
