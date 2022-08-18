import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [form, setForm] = useState({
        ...initialForm
    });

    const onChangeText = (event) => {
        setForm({
            ...form,
            [ event.target.name ]: event.target.value,
        });
    };

    return {
        //parámetros
        ...form,

    
        //métodos
        onChangeText,
    }
};