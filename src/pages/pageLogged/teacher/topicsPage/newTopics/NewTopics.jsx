import React, { useState, useEffect} from 'react';
import Header from '../../../../../componentes/header/Header';
import Variaveis from '../../../../../componentes/global/Variaveis';
import { useNavigate } from 'react-router-dom';

const NewTopics = () => {
    const [title] = useState("Criar novo tópico");
    const [values, setValues] = useState(initialState);
    const [valueDataError, setValueDataError] = useState(initialStateError);
    const navigate = useNavigate();

    function initialState(){
        return {
            topics_name: '',
            topics_description: '',
            topics_user_id: '',
            topics_user_name: '',
            topics_discipline_name: '',
        }
    }

    function initialStateError(){
        return {
            topics_nameError: '',
            topics_descriptionError: '',
            topics_discipline_nameError: '',
        }
    }

    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        
        // Limpa a mensagem de erro quando o usuário começa a digitar novamente
        setValueDataError({
            ...valueDataError,
            [`${name}Error`]: '',
        });
    }

    function createTopics(event) {
        event.preventDefault();
        console.log(values);

        const newErrors = {};

        if (values.topics_discipline_name === '') {
            newErrors.topics_discipline_nameError = "Campo inválido!";
        }
        if (values.topics_name === '') {
            newErrors.topics_nameError = "Campo inválido!";
        }
        if (values.topics_description === '') {
            newErrors.topics_descriptionError = "Campo inválido!";
        }

        // Define os novos erros
        setValueDataError({
            ...valueDataError,
            ...newErrors,
        });

        if (Object.keys(newErrors).length === 0) {
            // Não há erros, pode fazer a requisição
            const requestBody = {
                topics_name: values.topics_name,
                topics_description: values.topics_description,
                topics_user_id: Variaveis.email.substring(0, 6),
                topics_user_name: Variaveis.name,
                topics_discipline_name: values.topics_discipline_name,
            };

            fetch(Variaveis.urlBase + ":8080/topics/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.status === 200) {
                    return navigate("/professor");
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            })
            .catch(error => {
                console.error("Erro na solicitação:", error);
                // Lide com o erro, exibindo uma mensagem de erro ou realizando ação apropriada.
            });
        }
    }

    function cancelarTopics(){
        return navigate("/professor");
    }

    useEffect(() => { 
    }, [])

    return (
        <>
            <Header titleProps={title}/>
            <div className='bodyTeacker'>
                <form className='formBodyTeacker' onSubmit={createTopics}>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Nome da Disciplina </label>
                        <input autoComplete="off" className='inputNameTopics' name='topics_discipline_name' placeholder='Ex: Calculo 1' onChange={onChange} value={values.topics_discipline_name} required></input>
                        <span className='errorMessageForm'>{valueDataError.topics_discipline_nameError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Nome do tópico</label>
                        <input autoComplete="off" className='inputNameTopics' name='topics_name' placeholder='Ex: Funções trigonométricas' onChange={onChange} value={values.topics_name} required></input>
                        <span className='errorMessageForm'>{valueDataError.topics_nameError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Descrição do tópico</label>
                        <textarea autoComplete="off" className='inputDescriptionTopics' name='topics_description' placeholder='Ex: As funções trigonométricas são um conjunto de funções matemáticas que descrevem as relações entre os ângulos e os lados dos triângulos. Elas são amplamente usadas na geometria, na física, na engenharia e em muitos outros campos da matemática e das ciências naturais.' onChange={onChange} value={values.topics_description} required></textarea>
                        <span className='errorMessageForm'>{valueDataError.topics_descriptionError}</span>
                    </div>
                    <div>
                        <button className='buttonCancelTopics' onClick={() => {cancelarTopics()}}>Cancelar</button>
                    </div>
                    <div class="createTopic">
                        <button className='buttonCreateTopics'>New Topics</button>
                    </div>
                </form>
            </div>  
        </>
    );           
}

export default NewTopics;