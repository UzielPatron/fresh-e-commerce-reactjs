import { API_URL } from "../utils/constants";
import { strapiApi } from "./axiosApis";

export const startLoginUser = async (userForm) => {
    try {
        
        const response = await strapiApi.post( `/auth/local`, userForm, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        
        if(response.code) throw 'Usuario o contraseña incorrectos';
        else return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const startRegisterUser = async (userForm) => {
    try {
        const response = await strapiApi.post(`${ API_URL }/auth/local/register`, userForm, {
            headers: {
                'Content-Type':'application/json',
            }
        });

        return response;

    } catch (error) {
        console.log(error);
        return error;
    }
};