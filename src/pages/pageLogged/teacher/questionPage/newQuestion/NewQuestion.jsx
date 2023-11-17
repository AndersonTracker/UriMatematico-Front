import React, { useState, useEffect} from 'react';
import Header from '../../../../../componentes/header/Header';
import Variaveis from '../../../../../componentes/global/Variaveis';
import { useNavigate, useParams } from 'react-router-dom';

const NewQuestion = () => {
    const [title] = useState("Criar nova questão");
    const [values, setValues] = useState(initialState);
    const [valueDataError, setValueDataError] = useState(initialStateError);
    const navigate = useNavigate();
    const { id, topics } = useParams();
    var Latex = require('react-latex');
<link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
    function initialState(){
        return {
            questions_id: '',
            questions_name: '',
            questions_description: '',
            questions_user_id: '',
            questions_user_name: '',
            questions_topics_id: '',
            questions_text: '',
            questions_correct_alternative: '',
            questions_correct_alternative_description: '',
            questions_video_url_description: '',
            questions_image_url: ''
        }
    }

    function initialStateError(){
        return {
            questions_idError: '',
            questions_nameError: '',
            questions_descriptionError: '',
            questions_user_idError: '',
            questions_user_nameError: '',
            questions_topics_idError: '',
            questions_textError: '',
            questions_correct_alternativeError: '',
            questions_correct_alternative_descriptionError: '',
            questions_video_url_descriptionError: '',
            questions_image_urlError: ''
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

    function createQuestion(event) {
        event.preventDefault();
    
        const newErrors = {};
        
        if (values.questions_name === '') {
            newErrors.questions_nameError = "Campo inválido!";
        }
        if (values.questions_description === '') {
            newErrors.questions_descriptionError = "Campo inválido!";
        }
        if (values.questions_text === '') {
            newErrors.questions_textError = "Campo inválido!";
        }
        if (values.questions_correct_alternative === '') {
            newErrors.questions_correct_alternativeError = "Campo inválido!";
        }
        if (values.questions_correct_alternative_description === '') {
            newErrors.questions_correct_alternative_descriptionError = "Campo inválido!";
        }
        if (values.questions_video_url_description === '') {
            newErrors.questions_video_url_descriptionError = "Campo inválido!";
        }
        if (values.questions_image_url === '') {
            newErrors.questions_image_urlError = "Campo inválido!";
        }

        // Define os novos erros
        setValueDataError({
            ...valueDataError,
            ...newErrors,
        });

        if (Object.keys(newErrors).length === 0) {
            // Não há erros, pode fazer a requisição
            const requestBody = {
                questions_name: values.questions_name,
                questions_description: values.questions_description,
                questions_user_id : Variaveis.email.substring(0, 6),
                questions_user_name : Variaveis.name,
                questions_topics_id : id,
                questions_text : values.questions_text,
                questions_correct_alternative : values.questions_correct_alternative,
                questions_correct_alternative_description : values.questions_correct_alternative_description,
                questions_video_url_description : values.questions_video_url_description,
                questions_image_url : values.questions_image_url,

            };

            fetch(Variaveis.urlBase + ":8080/questions/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                return response.json()
            }).then((date) => {
                console.log(date.questions_id);
                if(true){
                    if(date != undefined){
                        navigate(`/alternative/${date.questions_id}/${topics}/${id}`);
                    }else{
                        console.log("questão ja existente");
                    }
                }
                
            }).catch(error => {
                console.error("Erro na solicitação:", error);
                // Lide com o erro, exibindo uma mensagem de erro ou realizando ação apropriada.
            });
        }
    }

    function cancelarTopics(){
        navigate(`/questionsView/${id}/${topics}`);
    }

    useEffect(() => { 
    }, [])

    return (
        <>
        
            <Header titleProps={title}/>
            <div className='bodyTeacker'>
                <form className='formBodyTeacker' onSubmit={createQuestion}>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Nome da Questão </label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_name' placeholder='Ex: Calculo 1' onChange={onChange} value={values.questions_name} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_nameError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Descrição da Questão</label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_description' placeholder='Ex: Funções trigonométricas' onChange={onChange} value={values.questions_description} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_descriptionError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Texto da Questão</label>
                        <textarea autoComplete="off" className='inputDescriptionTopics' name='questions_text' placeholder='Ex: As funções trigonométricas são um conjunto de funções matemáticas que descrevem as relações entre os ângulos e os lados dos triângulos. Elas são amplamente usadas na geometria, na física, na engenharia e em muitos outros campos da matemática e das ciências naturais.' onChange={onChange} value={values.questions_text} required></textarea>
                        <span className='errorMessageForm'>{valueDataError.questions_textError}</span>
                    </div>

                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Texto Renderizado</label><br/>
                        <div className='inputLatex'>
                            <Latex>{values.questions_text}</Latex>
                        </div>
                    </div>

                    <div className='FormTexts'>
                        <label className='labelNameTopics'>URL de Imagem</label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_image_url' placeholder='Cole a url de uma imagem ou formula aqui' onChange={onChange} value={values.questions_image_url} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_image_urlError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Alternativa Correta</label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_correct_alternative' placeholder='Digite a alternativa correta' onChange={onChange} value={values.questions_correct_alternative} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_correct_alternativeError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>Descrição da Alternativa Correta</label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_correct_alternative_description' placeholder='De uma leve descrição do porq essa alternativa é a correta' onChange={onChange} value={values.questions_correct_alternative_description} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_correct_alternative_descriptionError}</span>
                    </div>
                    <div className='FormTexts'>
                        <label className='labelNameTopics'>URL de um video falando sobre</label>
                        <input autoComplete="off" className='inputNameTopics' name='questions_video_url_description' placeholder='Aqui voce pode expor um video' onChange={onChange} value={values.questions_video_url_description} required></input>
                        <span className='errorMessageForm'>{valueDataError.questions_video_url_descriptionError}</span>
                    </div>
                    
                    <div>
                        <button className='buttonCancelTopics' onClick={() => {cancelarTopics()}}>Cancelar</button>
                    </div>
                    <div class="createTopic">
                        <button className='buttonCreateTopics'>Alternativas</button>
                    </div>
                </form>
            </div>  
        </>
    );           
}

export default NewQuestion;