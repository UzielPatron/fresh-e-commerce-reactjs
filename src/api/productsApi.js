import { strapiApi } from "./axiosApis";

export const getBannerImages = async () => {
    try {
        let result = {
            desktop: [],
            mobile: [],
        };

        strapiApi.get('/home-banners?position=1')
            .then(res => result.desktop = res.data[0].banner)
            .catch( error => new Error(error) );
            
        strapiApi.get('home-banners?position=2')
            .then(res => result.mobile = res.data[0].banner)
            .catch( error => new Error(error) );
        
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getProductsInOffert = async (page = 0, limit = -1) => {
    
    try {
        const response = await strapiApi.get(`/products?_start=${ page * 8 }&_limit=${ limit }&discount_gte=1&stock_gte=1&_sort=createdAt:DESC`);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getNumberOfProductsInOffer = async () => {
    try {
        const response = await strapiApi.get(`/products/count?discount_gte=1&stock_gte=1&_sort=createdAt:DESC`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLatestProducts = async (page = 0, limit = -1) => {
    try {
        const response = await strapiApi.get(`/products?_start=${ page * 8 }&_limit=${ limit }&stock_gte=1&_sort=createdAt:DESC`);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getNumberOfAllProducts = async () => {
    try {
        const response = await strapiApi.get(`/products/count?stock_gte=1&_sort=createdAt:DESC`);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await strapiApi.get(`/products/${ productId }`);

        return response.data;
    } catch (error) {
        console.log(error);
        return 'no-ok';
    }
};

export const getRelatedProducts = async (tag, productId, limit = 3 ) => {
    try {
        const response = await strapiApi.get(`/products?_q=${ tag }&_limit=${ limit }&id_ne=${ productId }&stock_gte=1&_sort=discount:DESC`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const getSearchProducts = async (search) => {
    try {
        const response = await strapiApi.get(`/products?_q=${ search }&_sort=stock:DESC`);

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};