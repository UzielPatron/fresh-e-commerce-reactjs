import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { startLoginUser, startRegisterUser } from '../../api/authApi';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { Alert } from '../../components/utils/Alert';
import { Loading } from '../../components/utils/Loading';
import { UserContext } from '../../context/UserContext';
import { useForm } from '../../hooks/useForm';
import '../../stylesheets/pages/auth/registerPage.css';


const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const RegisterPage = () => {
  
  
    const [loading, setLoading] = useState(false);
    const { login } = useContext( UserContext );
    const navigate = useNavigate();
    const { email, username, password, repeatPassword, onChangeText } = useForm({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    });

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if(emailRegex.test(email) && username.replace(' ', '').length >= 4 && password.replace(' ', '').length >= 4 && password === repeatPassword){
            const response = await startRegisterUser({
                email,
                username,
                password,
                repeatPassword,
            });
            
            if(response.code){
                setLoading(false);
                const message = response.response.data.message[0].messages[0].message;
                console.log(message);
                if( message == 'Email is already taken.') Alert('Error al registrar', 'El email ya se encuentra en uso, pruebe utilizando otro email, o ingrese a su cuenta')
                else if(message == 'Username already taken') Alert('Error al registrar', 'El nombre de usuario ya se encuentra en uso, pruebe utilizando otro nombre, o ingrese a su cuenta')
                else Alert( 'Error al registrar', 'Ocurrió un error inesperado al crear su cuenta, revise los campos o intente nuevamente más tarde' )
            }
            else {
                const loginResponse = await startLoginUser({
                    identifier: username,
                    password,
                });
                
                Alert('!Bienvenido!', 'Su cuenta se ha creado correctamente');
                
                if( loginResponse ){
                    login(loginResponse);
                    navigate('/');
                }
                else {
                    navigate('/auth/login');
                }
            }
        }
        else {
            Alert('Error al completar los datos', 'Revisa que todos los campos se hayan completado correctamente');
            setLoading(false);
        }
    }


    return (
    <>
        <AuthHeader />
        <div className="auth__form-container">
            {
            loading
                ? (
                    <div className='auth__form__loading-container'>
                        <Loading className='auth__form__loading' />
                    </div>
                )
                : (
                    <form
                        className='auth__form'
                        onSubmit={ handleSubmit }
                    >
                        <label>
                            <h2 className='auth__form__title'>¡Hola! Completá los campos para crear una cuenta</h2>
                        </label>
                        <label className='auth__form__label'>
                            <span className='auth__form__label__text'>Email</span>
                            <input
                                type="email"
                                autoComplete="off"
                                placeholder=''
                                className='auth__form__label__input'
                                name='email'
                                value={ email }
                                onChange={ onChangeText } 
                            />
                        </label>
                        <label className='auth__form__label'>
                            <span className='auth__form__label__text' >Nombre de usuario</span>
                            <input 
                                type="text" 
                                autoComplete="off"
                                placeholder='' 
                                className='auth__form__label__input'
                                name='username'
                                value={ username }
                                onChange={ onChangeText }                         
                            />
                        </label>
                        <label className='auth__form__label'>
                            <span className='auth__form__label__text' >Contraseña</span>
                            <input 
                                type="password"
                                autoComplete="off" 
                                placeholder='' 
                                className='auth__form__label__input'
                                name='password'
                                value={ password }
                                onChange={ onChangeText }                         
                            />
                        </label>
                        <label className='auth__form__label'>
                            <span className='auth__form__label__text' >Repetir contraseña</span>
                            <input 
                                type="password" 
                                autoComplete="off"
                                placeholder='' 
                                className='auth__form__label__input'
                                name='repeatPassword'
                                value={ repeatPassword }
                                onChange={ onChangeText }
                            />
                        </label>

                        <button type='submit' className='auth__form__btn auth__form__btn-primary' >REGISTRARSE</button>
                        
                        <Link
                            to='/auth/login'
                            className='auth__form__btn-link'
                        >
                            <button className='auth__form__btn auth__form__btn-secondary' >INICIAR SESIÓN</button>
                        </Link>
                    </form>
                )
            }
            
            
        </div>
    </>
  )
};
