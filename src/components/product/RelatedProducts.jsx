import React, { useEffect, useState } from 'react'
import { RelatedProductItem } from './RelatedProductItem';
import '../../stylesheets/components/product/relatedProducts.css';
import { Loading } from '../utils/Loading';

export const RelatedProducts = ({ products }) => {
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        !products
            ? setLoading(true)
            : setLoading(false);
    }, [products]);
    
    return (
        <>
            <h3 className="related-products__title">
                Productos similares
            </h3>
            <div className="related-products__grid">
                {   
                    loading
                        ? <Loading />
                         
                        :   products.map( product => (
                                <RelatedProductItem
                                    key={ product.id }
                                    product={ product }
                                />
                    ) )
                }
            </div>
        </>
    )
}
