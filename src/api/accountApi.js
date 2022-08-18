// import { API_URL } from "../utils/constants";
import { strapiApi } from "./axiosApis";

export const getAccountData = async (token) => {
    try{
        const response = await strapiApi.get('/users/me', {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ token }`
            }
        });

        return response.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};


export const updateAccountData = async (auth, formData) => {
    try{
        const response = await strapiApi.put(`/users/${ auth.idUser }`, formData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        });

        return response.data;
    }
    catch(error){
        console.log(error.response.data);
        return null;
    }
};


export const getAllAddresses = async (auth) => {
    try {
        const response = await strapiApi.get(`/addresses?user=${ auth.idUser }`, {
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


export const getAnAddress = async (auth, idAddress) => {
    try {
        const response = await strapiApiApi.get(`/addresses/${ idAddress }`, {
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


export const addAnAddress = async( auth, address ) => {
    try {
        const body = { user: auth.idUser, ...address };
        const headers = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        }

        const response = await strapiApi.post(`/addresses`, body, headers);

        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};


export const deleteAnAddress = async (auth, idAddress) => {
    try {        
        const response = await strapiApi.delete(`/addresses/${ idAddress }`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        });

        return response.data;

    } catch (error) {
        console.log(error)
        return null;
    }  
};




export const updateAnAddress = async (auth, address) => {
    try {
        const body = address;
        const headers = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${ auth.token }`
            }
        };

        const response = await strapiApi.put(`/addresses/${ address.id }`, body, headers);

        return response.data;


    } catch (error) {
        console.log(error);
        return null;
    }
};