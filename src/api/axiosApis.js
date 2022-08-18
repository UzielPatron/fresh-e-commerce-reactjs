import axios from 'axios';
import { API_URL, MERCADOPAGO_API_URL } from '../utils/constants';

export const strapiApi = axios.create({
    baseURL: API_URL
});

export const mercadopagoApi = axios.create({
    baseURL: MERCADOPAGO_API_URL
})