import React from "react";

const calcPrice = (price, discount = 0) => {
    const finalPrice = ((100 - discount) * price) / 100;
    const finalFinalPrice = finalPrice.toFixed(2).replace('.', ',');
    if(finalFinalPrice.length > 6 && finalFinalPrice.length <= 9 ){
        const lastPart = finalFinalPrice.slice(-6);
        const firstPart = finalFinalPrice.slice(0, -6);
        const finalFinalFinalPrice = `${ firstPart }.${ lastPart }`;
        return finalFinalFinalPrice;
    }
    else if(finalFinalPrice.length > 9){
        const lastPart = finalFinalPrice.slice(-6);
        const secondPart = finalFinalPrice.slice(-6, -9);
        const firstPart = finalFinalPrice.slice(0, -9);
        const finalFinalFinalPrice = `${ firstPart }.${ secondPart }.${ lastPart }`;
        return finalFinalFinalPrice;
    }
    return finalFinalPrice;
};

export const Prices = ({ price, discount = 0 }) => {
    const previousPrice = calcPrice(price, 0);
    const actualPrice = calcPrice(price, discount);
    
    return (
        <div className="products__item_price-container">
            {
                discount > 0
                    ? (
                        <>
                            <div className="products__item_price-and-discount">
                                <p className='products__item_price'>${ actualPrice }</p>
                                <p className='products__item_previous-price'>${ previousPrice }</p>
                            </div>
                            <p className='products__item_discount'>{ discount }% OFF</p>
                        </>
                    )

                    : (
                        <p className="products__item_price">
                            ${ calcPrice(price, 0) }
                        </p>
                    ) 
            }
        </div>
  )
};