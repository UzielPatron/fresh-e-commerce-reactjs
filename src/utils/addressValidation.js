import { Alert } from "../components/utils/Alert";

const onlyNumbersRegex = /^[0-9]*$/;
const phoneNumberRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

export const validateAddressForm = ({ title, name_lastname, address, postal_code, city, state, phone }) => {
    if( title.trim().length < 3 ) {
        Alert('El título debe contener al menos 3 caracteres','','info');
        return false;
    }
    if( name_lastname.trim().length < 5 || !name_lastname.trim().includes(' ') ) {
        Alert('El nombre y apellido deben contener un formato válido');
        return false;
    }
    if( address.trim().length < 3 ) {
        Alert('La dirección debe contener al menos 3 caracteres');
        return false;   
    }
    if( postal_code.trim().length < 4 || !onlyNumbersRegex.test(postal_code.trim()) ) {
        Alert('El código postal no tiene un formato válido', 'Intenta colocar sólo los números del código postal', 'info');
        return false;
    }
    if( city.trim().length < 3 ) {
        Alert('La ciudad debe contener al menos 3 caracteres','','info');
        return false;
    }
    if( state.trim().length < 4 ) {
        Alert('La provincia debe contener al menos 4 caracteres','','info');
        return false;
    }
    if( phone.trim().length < 6 || !phoneNumberRegex.test(phone.trim()) ) {
        Alert('Número no válido','El número de teléfono no cumple con el formato requerido, asegúrate de colocar el número completo, con el código de área y sin espacios, por ej: 2473123456','info');
        return false;
    }

    return true;
};