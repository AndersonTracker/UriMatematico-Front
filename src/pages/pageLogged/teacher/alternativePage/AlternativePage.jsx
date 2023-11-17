import React, { useState, useEffect } from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import { useNavigate, useParams } from 'react-router-dom';

const AlternativePage = () => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const { id, topics, idTopic } = useParams();
  const [inputValue, setInputValue] = useState(''); // Estado para o valor do input
  const navigate = useNavigate();
  var Latex = require('react-latex');

    function cancelarAddAlternatives(){
        return navigate("/professor");
    }

    function question() {
        fetch(Variaveis.urlBase + ":8080/questions/" + id)
        .then((response) => response.json())
        .then((date) => {
            setData(date);
        });
    }

    function alternativesQuestion() {
        fetch(Variaveis.urlBase + ":8080/alternatives/" + id)
        .then((response) => response.json())
        .then((date) => {
            console.log(date);
            setAlternatives(date);
        });
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    function saveAlternatives(){
        fetch(Variaveis.urlBase + ":8080/alternatives/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alternatives)
        })
        .then(response => {
            console.log(idTopic);
            console.log(topics);
            navigate(`/questionsView/${idTopic}/${topics}`);
        })
        .catch(error => {
            console.error("Erro na solicitação:", error);
            // Lide com o erro, exibindo uma mensagem de erro ou realizando ação apropriada.
        });
    }

    const handleAddToList = () => {
        if (inputValue.trim() === '') return; // Não adiciona itens vazios
    
        const newItem = { alternatives_id: Date.now(), alternatives_description: inputValue, alternatives_questions_id: id, alternatives_edition: "editadoCriado" };
        setAlternatives([...alternatives, newItem]);
        setInputValue(''); // Limpa o campo de entrada
      };
    
      const handleEditItem = (id, newText) => {
        // Encontra o item na lista e atualiza o texto
        const updatedList = alternatives.map((item) =>
          item.alternatives_id === id ? { ...item, alternatives_description: newText, alternatives_edition: "editadoCriado" } : item
        );
        setAlternatives(updatedList);
      };

  useEffect(() => {
    setTitle("Alternativas");
    question();
    alternativesQuestion();
  }, []);

  return (
    <>
      <Header titleProps={title} />
      <div className='bodyQuestion'>
          <div className='blocoContainerTopics'>
            <div className='divOpenVisor'>
              <div className='divComTexto'>
                <p className='nameTopicsQuestion'>{data.questions_name}</p>
                <p className='teacherNameQuestions'>{data.questions_user_name}</p>
                <p className='descriptionTopics'>{data.questions_description}</p>
              </div>
            </div>
            <Latex>{data.questions_text}</Latex><br/><br/>
              <img className='imgQuestion' src={data.questions_image_url} />
              <div>
                <div className='alternativesEspace'>
                    <ul className='ulAlternative'>
                        {alternatives.map((item) => (
                            <li key={item.alternatives_id}>
                                <input className='inputAlternatives'
                                type="text"
                                value={item.alternatives_description}
                                onChange={(e) => handleEditItem(item.alternatives_id, e.target.value)}
                                />
                                <div className='alternativeLatex'>
                                    <Latex>{item.alternatives_description}</Latex>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
              
                    <div className='FormTextsAlter'>
                        <label className='labelNameTopics'>Adicione uma alternativa</label>
                        <div>
                            <input className='botãoAddAlternative' type="text" value={inputValue} onChange={handleInputChange} placeholder="Ex: A) 2+2 = 4"/>
                            <button className='botãoAddAlternative' onClick={handleAddToList}>Adicionar</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <button className='buttonCancelTopics' onClick={() => {cancelarAddAlternatives()}}>Cancelar</button>
                        </div>
                        <div class="createTopic">
                            <button className='buttonCreateTopics' onClick={() => {saveAlternatives()}}>Salvar</button>
                        </div>
                    </div>
              </div>
            
          </div>
      </div>
    </>
  );
};

export default AlternativePage;