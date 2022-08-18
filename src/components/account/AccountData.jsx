import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateAccountData } from '../../api/accountApi';
import { Alert } from '../utils/Alert';
import { Loading } from '../utils/Loading';
import { ChangePassword } from './ChangePassword';
import { isValidName, isValidLastname, isValidUsername, isValidEmail, isValidPassword } from '../../utils/accountValidations';



export const AccountData = ({ user, auth, logout }) => {
    //useStates
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const [openPassword, setOpenPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        password: '',
        repeatPassword: '',
    });

    // useRefs
    const nameInput = useRef(null);
    const lastnameInput = useRef(null);
    const emailInput = useRef(null);
    const usernameInput = useRef(null);
    
    // navigation
    const navigate = useNavigate();

    // functions
    const editAccountData = () => {
        setIsReadOnly(false);
        nameInput.current.focus();
    };

    const saveEditedAccountData = async () => {
        const nameValidation = isValidName(nameInput.current.value);
        const lastnameValidation = isValidLastname(lastnameInput.current.value);
        const usernameValidation = isValidUsername(usernameInput.current.value);
        const emailValidation = isValidEmail(emailInput.current.value);

        if(nameValidation !== 'ok') return Alert('Error en la validación', `${ nameValidation }`, 'info' );
        if(lastnameValidation !== 'ok') return Alert('Error en la validación', `${ lastnameValidation }`, 'info' );
        if(usernameValidation !== 'ok') return Alert('Error en la validación', `${ usernameValidation }`, 'info' );
        if(emailValidation !== 'ok') return Alert('Error en la validación', `${ emailValidation }`, 'info' );
        
        if(nameValidation === 'ok' && lastnameValidation === 'ok' && emailValidation === 'ok'){
            setIsSaving(true);
            const response = await updateAccountData(auth, formData);
            setIsSaving(false);
            if(response){
                Alert('Datos actualizados correctamente', '', 'success');
                setIsReadOnly(true);
            }
            else {
                Alert('Nombre de usuario o email en uso', 'El nombre de usuario o email ya se encuentra en uso, intenta utilizando uno diferente','error');
            }
        }
    };

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [ e.target.name ]: e.target.value,
        })
    };

    const changePassword = async () => {
        if(!openPassword) return setOpenPassword(true);
        else {
            const passwordValidation = isValidPassword(passwordData.password, passwordData.repeatPassword);
            if( passwordValidation !== 'ok' ) return Alert('No se pudo actualizar la contraseña', passwordValidation, 'info');
            else{
                const response = await updateAccountData(auth, passwordData);
                if(response){
                    Alert('Contraseña actualizada correctamente', '', 'success');
                    setOpenPassword(false);
                }
                else return Alert('No se pudo actualizar la contraseña', 'Ocurrió un erro al actualizar la contraseña, intenta nuevamente mas tarde', 'error');
            }
        }
    };


    const onLogout = () => {
        logout();
        navigate('/auth/login');
    };

    //Use effect
    useEffect(() => {
        setFormData({
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
        });
    }, [user, auth]);


    //JSX return
    //JSX return
    //JSX return
    return (
    <div className="my-account-data-container">
        <h4 className="my-account-data-title">Datos de mi cuenta</h4>
        <div className="my-account-data-fields-container">
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Nombre
                </div>
                <input
                    ref={ nameInput }
                    type="text"
                    name="name"
                    className={ `my-account-data-field-input ${ !isReadOnly && 'is-editable' }` }
                    maxLength={ 25 }
                    value={ formData.name || '' }
                    onChange={ onChangeInput }
                    readOnly={ isReadOnly }
                />
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Apellido
                </div>
                <input
                    ref={ lastnameInput }
                    type="text"
                    name="lastname"
                    className={ `my-account-data-field-input ${ !isReadOnly && 'is-editable' }` }
                    maxLength={ 25 }
                    value={ formData.lastname || '' }
                    onChange={ onChangeInput }
                    readOnly={ isReadOnly }
                />
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Nombre de usuario
                </div>
                <input
                    ref={ usernameInput }
                    type="text"
                    name="username"
                    className={ `my-account-data-field-input ${ !isReadOnly && 'is-editable' }` }
                    maxLength={ 25 }
                    value={ formData.username || '' }
                    onChange={ onChangeInput }
                    readOnly={ isReadOnly }
                />
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Email
                </div>
                <input
                    ref={ emailInput }
                    type="text"
                    name="email"
                    className={ `my-account-data-field-input ${ !isReadOnly && 'is-editable' }` }
                    maxLength={ 40 }
                    value={ formData.email || '' }
                    onChange={ onChangeInput }
                    readOnly={ isReadOnly }
                />
            </div>
            <div className="my-account-data-field-container password">
                <div className="my-account-data-field-password-container">
                    <div className="my-account-data-field-title">
                        Contraseña
                    </div>
                    <div
                        className={ `my-account-data-field-value ${ openPassword && 'save-password' }` }
                        onClick={ changePassword }
                    >
                        { !openPassword ? 'Cambiar contraseña' : 'Guardar contraseña' }
                    </div>
                </div>
                <ChangePassword
                    openPassword={ openPassword }
                    setOpenPassword={ setOpenPassword }
                    passwordData={ passwordData }
                    setPasswordData={ setPasswordData }
                />
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Direcciones
                </div>
                <Link to="/account/addresses" className="my-account-data-field-value">
                    Administrar mis direcciones
                </Link>
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Mis pedidos
                </div>
                <Link to="/account/orders" className="my-account-data-field-value">
                    Ir a mis pedidos
                </Link>
            </div>
            <div className="my-account-data-field-container">
                <div className="my-account-data-field-title">
                    Mis favoritos
                </div>
                <Link to="/account/favorites" className="my-account-data-field-value">
                    Ir a mis favoritos
                </Link>
            </div>
        </div>
        <div className="my-account-btn-container">
            <button
                className={ `my-account-edit-account-btn ${ !isReadOnly && 'is-saving' }` }
                onClick={ isReadOnly ? editAccountData : saveEditedAccountData }
                disabled={ isSaving }
            >
                {
                    isSaving
                        ? <div className="saving-data"><Loading /></div>
                        : isReadOnly
                            ? 'Editar datos'
                            : 'Guardar'
                }
            </button>
            <button className="my-account-close-session-btn" onClick={ onLogout } >
                SALIR
            </button>
        </div>
    </div>
  )
};
