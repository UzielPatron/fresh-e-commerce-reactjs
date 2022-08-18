import { strapiApi } from "./axiosApis";

export const getOrders = async (auth) => {
    try {

        const params = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${ auth.token }`
            }
        };

        const response = await strapiApi.get(`/orders?user=${ auth.idUser }&_sort=createdAt:desc&_limit=30`, params);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteAnOrder = async (auth, orderId) => {
    try {

        const params = {
            headers: {
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${ auth.token }`
                    }
        };

        const response = await strapiApi.delete(`/orders/${ orderId }`, params);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};