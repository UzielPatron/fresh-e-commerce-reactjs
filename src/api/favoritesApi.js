import { API_URL } from "../utils/constants";
import { strapiApi } from "./axiosApis";

export const getFavoriteProducts = async (auth) => {
    try {
        const response = await strapiApi.get(`/favorites?user=${ auth.idUser }`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        });

        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};


export const addProductToFavorite = async (auth, idProduct) => {
    try {
        const body = {
            product: idProduct,
            user: auth.idUser,
        };
        const headers =  {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        };
        const response = await strapiApi.post('/favorites', body, headers);

        return response.data;        
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const deleteFavoriteProduct = async (auth, idProduct) => {
    
    
    try {
        const dataFound = await isFavoriteProduct( auth, idProduct );
        if( dataFound.length > 0 ){

            const url = `${ API_URL }/favorites/${ dataFound[0]?._id }`;
            const params = {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${ auth.token }`,
                },
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            return result;
        }
        else return null;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const isFavoriteProduct = async (auth, idProduct) => {
    try {
        const response = await strapiApi.get(`/favorites?user=${ auth.idUser }&product=${ idProduct }`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        });

        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};