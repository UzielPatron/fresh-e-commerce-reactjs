
const usernameRegex = /^[A-Z]+$/i;
const nameRegex = /^[A-Z\s]+$/i;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isValidName = (value) => {
    if(value.length < 3) return 'El nombre debe contener al menos 3 letras';
    if(!nameRegex.test(value)) return 'El nombre debe contener solo letras';
    return 'ok';
};

export const isValidLastname = (value) => {
    if(value.length < 3) return 'El apellido debe contener al menos 3 letras';
    if(!nameRegex.test(value)) return 'El apellido debe contener solo letras';
    return 'ok';
};

export const isValidUsername = value => {
    if(value.length < 3) return 'El nombre de usuario debe contener al menos 3 caracteres';
    if(!usernameRegex.test(value)) return 'El nombre de usuario debe contener solo letras y sin espacios';
    return 'ok';
};

export const isValidEmail = (value) => {
    if(!emailRegex.test(value)) return 'El email no tiene un formato válido';
    return 'ok';
};

export const isValidPassword = (password, repeatPassword) => {
    if(password.trim().length < 6) return 'La contraseña debe contener al menos 6 caracteres';
    if(password.trim().includes(' ')) return 'La contraseña no debe contener espacios';
    if(password !== repeatPassword) return 'Las contraseñas no son iguales';
    return 'ok';
}

