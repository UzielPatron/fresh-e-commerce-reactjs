import { CART } from "../utils/constants";
import { strapiApi } from "./axiosApis";

export const getProductsInCart = () => {
    const cart = localStorage.getItem(CART);0
    if(!cart) return [];
    return JSON.parse(cart);
};

export const addProductToCart = (idProduct, quantity, stock) => {
    const cart = getProductsInCart();

    if(stock < quantity) quantity = stock;

    if(cart.length === 0) cart.push({
        idProduct,
        quantity,
    })
    else {
        let isPresent = false;
        cart.map( product => {
            if(product.idProduct === idProduct){
                if((product.quantity + quantity) > stock) product.quantity = stock;
                else product.quantity = product.quantity + quantity;
                isPresent = true;
                return product;
            }
        });

        if(!isPresent){
            cart.push({
                idProduct,
                quantity
            });
        };
    };

    localStorage.setItem(CART, JSON.stringify(cart));
    return true;
};



export const deleteProductToCart = (idProduct) => {

    const cart = getProductsInCart();
    if(cart.length === 0) return;

    const newCart = cart.filter( product => {
        return product.idProduct !== idProduct
    } );

    localStorage.setItem(CART, JSON.stringify(newCart));
    return true;

};



export const deleteCart = () => {
    localStorage.removeItem(CART);
    return true;
};




const calcPrice = (price, discount = 0) => {
    if(discount) return ( 100 - discount ) * price / 100;
    else return price;
};



export const createOrderCartApi = async (auth, productsInCart, address, totalPayment, paymentMethod ) => {

    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;
    delete addressShipping.updatedAt;

    const products = [];
    let quantity = {};
    let amounts = {};
    for (const product of productsInCart){
        products.push(product.id);
        const id = product.id;
        quantity = {
            ...quantity,
            [ id ]: product.quantity,
        }
        amounts = {
            ...amounts,
            [ id ]: calcPrice(product.price, product.discount),
        };
    };

    const data = {
            totalPayment,
            user: auth.idUser,
            addressShipping,
            products,
            quantity,
            amounts,
            paymentMethod,
            state: ( paymentMethod === 'mercadopago' ) ? 'PAGO PENDIENTE' : 'ENVIO PENDIENTE',
    };


    try {

        const params = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`,  
            }
        }

        const response = await strapiApi.post(`/orders`, data, params);
        
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }

};