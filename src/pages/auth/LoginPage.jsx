import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { startLoginUser } from '../../api/authApi';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { UserContext } from '../../context/UserContext';
import { useForm } from '../../hooks/useForm';
import { Alert } from '../../components/utils/Alert';
import { useState } from 'react';
import { Loading } from '../../components/utils/Loading';
import '../../stylesheets/pages/auth/registerPage.css';

export const LoginPage = () => {
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext( UserContext );
    const { identifier, password, onChangeText } = useForm({
        identifier: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if(identifier.replaceAll(' ', '').length > 4 && password.length >= 4){
            const response = await startLoginUser({
                identifier,
                password
            });

            if(response) {
                login(response);
                navigate('/');
            }
            else{
                Alert('Error al iniciar sesión', 'Usuario o contraseña incorrectos');
                setLoading(false)
            }
        }
        else {
            Alert('Campos incompletos', 'Por favor, completa correctamente los campos');
            setLoading(false)
        }
    };
    
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
                                    <h2 className='auth__form__title'>¡Hola! Ingresá tu email o usuario para ingresar</h2>
                                </label>
                                <label className='auth__form__label'>
                                    <span className='auth__form__label__text'>Email o nombre de usuario</span>
                                    <input
                                        name='identifier'
                                        type="text"
                                        placeholder=''
                                        className='auth__form__label__input'
                                        value={ identifier }
                                        onChange={ onChangeText }
                                    />
                                </label>
                                <label className='auth__form__label'>
                                    <span className='auth__form__label__text' >Contraseña</span>
                                    <input
                                        name='password'
                                        type='password'
                                        placeholder='' 
                                        className='auth__form__label__input'
                                        value={ password }
                                        onChange={ onChangeText }
                                    />
                                </label>
                                <button className='auth__form__btn auth__form__btn-primary' >
                                    INICIAR SESIÓN
                                </button>
                                <Link
                                    to='/auth/register'
                                >
                                    <button
                                        type='submit'
                                        className='auth__form__btn auth__form__btn-secondary'
                                    >
                                        REGISTRARSE
                                    </button>
                                </Link>
                            </form>
                        )
                }
            </div>
        </>
  )
};
