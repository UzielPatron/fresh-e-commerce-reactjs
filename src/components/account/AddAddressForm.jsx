import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { addAnAddress } from '../../api/accountApi';
import { UserContext } from '../../context/UserContext';
import { Alert } from '../utils/Alert';
import { validateAddressForm } from '../../utils/addressValidation';
import { Loading } from '../utils/Loading';


export const AddAddressForm = ({ closeModal, setRechargeAddresses }) => {
  
    const { auth } = useContext( UserContext );
    const [formData, setFormData] = useState({
        title: '',
        name_lastname: '',
        address: '',
        postal_code: '',
        city: '',
        state: '',
        phone: '',
    });
    const [addingAddress, setAddingAddress] = useState(false);



    
    const onInputChange = (e) => {
        setFormData({
            ...formData,
            [ e.target.name ]: e.target.value,
        });
    };

  
    const onAddAddress = async (e) => {
        e.preventDefault();
        setAddingAddress(true);
        const validationResult = validateAddressForm(formData);

        if(validationResult){
            const response = await addAnAddress(auth, formData);
            if(response){
                Alert('Dirección añadida', 'Tu dirección fué añadida correctamente', 'success');
                setRechargeAddresses(true);
                closeModal();
            }
            else {
                Alert('No se pudo añadir la dirección', 'Ocurrió un error al añadir tu dirección en el servidor, comprueba que todos los campos están completados correctamente o intenta nuevamente mas tarde', 'error');
            }
        }
        setAddingAddress(false);
        return;
    };

    const onCloseModal = (e) => {
        e.preventDefault();
        closeModal();
    }
  
    return (
    <div className="addresses-add-address-form-container">
        <form className='addresses-add-address-form'>
            <h4 className="addresses-add-address-form-title">
                Añadir dirección
            </h4>
            <input
                name='title'
                value={ formData.title }
                onChange={ onInputChange }
                type="text"
                placeholder='Título'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='name_lastname'
                value={ formData.name_lastname }
                onChange={ onInputChange }
                type="text"
                placeholder='Nombre y apellido'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='address'
                value={ formData.address }
                onChange={ onInputChange }
                type="text"
                placeholder='Dirección'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='postal_code'
                value={ formData.postal_code }
                onChange={ onInputChange }
                type="text"
                placeholder='Código postal'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='city'
                value={ formData.city }
                onChange={ onInputChange }
                type="text"
                placeholder='Ciudad'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='state'
                value={ formData.state }
                onChange={ onInputChange }
                type="text"
                placeholder='Provincia'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />
            <input
                name='phone'
                value={ formData.phone }
                onChange={ onInputChange }
                type="text"
                placeholder='Teléfono'
                className='addresses-add-address-form-input'
                autoComplete='off'
            />

            <div className="addresses-add-address-btn-submit-container">
                <button
                    type='submit'
                    className="addresses-add-address-btn-submit"
                    onClick={ onAddAddress }
                    disabled={ addingAddress }
                >
                {
                    addingAddress
                        ? <Loading className='adding-address-loading' />
                        : 'CREAR DIRECCIÓN'
                }
                </button>
            </div>
            <button className="addresses-close-modal" onClick={ onCloseModal }>
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </form>
    </div>
  )
};
