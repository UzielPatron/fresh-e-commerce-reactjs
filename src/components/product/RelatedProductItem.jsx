import React from 'react';
import { Link } from 'react-router-dom';
import { Prices } from './Prices';
import { API_URL } from '../../utils/constants';

export const RelatedProductItem = ({ product }) => {
  return (
    <Link
        to={ `/product/${ product.id }` }
        className="related-products__card"
    >
        <div className="related-products__card__image-container">
            <img src={ `${ API_URL }${ product?.main_image?.formats?.small?.url }` } alt={ product.title } className="related-products__card__image" />
        </div>
        <div className="related-products__card__data-container">
            <h5 className="related-products__card__data__title">
                { product.title }
            </h5>
            <Prices price={ product.price } discount={ product.discount } />
        </div>
    </Link>
  )
}
