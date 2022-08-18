import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const ChangePassword = ({ openPassword, setOpenPassword, passwordData, setPasswordData }) => {

    const onChangeText = e => {
        setPasswordData({
            ...passwordData,
            [ e.target.name ] : e.target.value,
        });
    };

    const password = useRef(null);


    useEffect(() => {
        setPasswordData({
            password: '',
            repeatPassword: '',
        });

        if(openPassword) password.current.focus();

    }, [openPassword]);

    
    return (
    <>
        {
            openPassword && (
                            <div className="my-account-data-field-password">
                                <div className="my-account-data-field-password-item">
                                    <p>Nueva contraseña</p>
                                    <input
                                        ref={password}
                                        type="password"
                                        name='password'
                                        onChange={ onChangeText }
                                        value={ passwordData.password }
                                    />
                                </div>
                                <div className="my-account-data-field-password-item">
                                    <p>Repetir contraseña</p>
                                    <input
                                        type="password"
                                        name='repeatPassword'
                                        onChange={ onChangeText }
                                        value={ passwordData.repeatPassword }
                                    />
                                </div>
                                <button className='my-account-data-field-password-cancel-btn' onClick={ () => setOpenPassword(false) }>Cancelar</button>
                            </div>
                            )
        }
    </>
  )
};
