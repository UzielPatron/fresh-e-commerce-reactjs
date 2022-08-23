import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import { ProductItem } from './ProductItem';
import '../../stylesheets/components/home/productList.css';

export const ProductList = ({ products, title='Productos' }) => {
    
    const { auth } = useContext(UserContext);
    
    return (
        <div className="products">
            <h2 className='products__title'>{ title }</h2>
            <div className="products__grid">
            {
                products.map( product => (
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
