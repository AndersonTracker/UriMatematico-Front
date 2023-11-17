import React, { useState, useEffect } from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import { useNavigate, useParams } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { VideoModal } from '../../../../componentes/modais/VideoModal';

const QuestionPage = () => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [openDivId, setOpenDivId] = useState(null); // Estado para rastrear a div atualmente aberta
  const [selectedAlternative, setSelectedAlternative] = useState(null); // Estado para rastrear a alternativa selecionada
  const [isCorrect, SetIsCorrect] = useState(null);
  const { id, topics } = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textDescription, setTextDescription] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  var Latex = require('react-latex');
  
  function questionsFromTopics() {
    fetch(Variaveis.urlBase + ":8080/questions/topics/" + id)
      .then((response) => response.json())
      .then((date) => {
        console.log(date);
        setData(date);
      });
  }

  const openCloseModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  function questionDescription(item) {
    const valor = item.questions_id;
    setTextDescription(item.questions_correct_alternative);
    setUrlVideo(item.questions_video_url_description);
    // Verifique se a div atualmente aberta é a mesma que está sendo clicada
    if (openDivId === valor) {
      // Se for a mesma, feche a div
      setOpenDivId(null);
    } else {
      // Se for diferente, carregue as alternativas e abra a nova div
      fetch(Variaveis.urlBase + ":8080/alternatives/" + item.questions_id)
        .then((response) => response.json())
        .then((date) => {
          console.log(date);
          setAlternatives(date);
          setOpenDivId(valor); // Atualize o ID da div aberta
          setSelectedAlternative(null); // Limpe a alternativa selecionada quando a div é aberta
        });
    }
  }

  function handleAlternativeClick(alternativeSelected, alternativeCorect) {
    setSelectedAlternative(null);
    // Verifique se a alternativa clicada é correta
    if (alternativeSelected == alternativeCorect) {
      setSelectedAlternative(alternativeSelected); // Defina a alternativa selecionada como correta
      SetIsCorrect(true);
    } else {
      openCloseModal();
      setSelectedAlternative(alternativeSelected); // Defina a alternativa selecionada como incorreta
      SetIsCorrect(null);
    }
  }

  function editarQuestion(item){
    navigate(`/questionEdit/${item.questions_id}/${topics}/${id}`);
  }

  function createQuestion(){
    navigate(`/createNewQuestion/${id}/${topics}`);
}

  function deleteQuestion(item){
    fetch(Variaveis.urlBase + ":8080/questions/"+item.questions_id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      if (response.status === 200) {
          questionsFromTopics();
      } else {
          console.error('Erro ao excluir o tópico.');
      }
  })
  .catch(error => {
      console.error('Erro na solicitação:', error);
      // Lide com o erro, exibindo uma mensagem de erro ou realizando ação apropriada.
  });
  }

  useEffect(() => {
    setTitle("questões");
    questionsFromTopics();
  }, []);

  return (
    <>
      <VideoModal isOpen={modalIsOpen} onClose={openCloseModal} textDescription={textDescription} urlVideo={urlVideo}/>
      <Header titleProps={title} />
        <div class="newElementQuestion">
            <button className='buttonNewElementQuestion' onClick={() => {createQuestion()}}>New Question</button>
        </div>
            <h1 className='nameTopicH1'>{topics}</h1>
      <div className='bodyQuestion'>
        {data.map((item) => (
          <div className='blocoContainerTopics' key={item.questions_id}>
            <div className='divBotEditDelete'>
                <GrEdit className='botãoEdit' onClick={() => {editarQuestion(item)}}></GrEdit>
                <MdDeleteOutline className='botãoDelete' onClick={() => {deleteQuestion(item)}}></MdDeleteOutline>
            </div>
            <div className='divOpenVisor' onClick={() => questionDescription(item)}>
              <div className='divComTexto'>
                <p className='nameTopicsQuestion'>{item.questions_name}</p>
                <p className='teacherNameQuestions'>{item.questions_user_name}</p>
                <p className='descriptionTopics'>{item.questions_description}</p>
              </div>
            </div>
            <div className='textEscondido' id={item.questions_id} style={{ display: openDivId === item.questions_id ? 'block' : 'none' }}>
            <Latex>{item.questions_text}</Latex><br/><br/>
              <img className='imgQuestion' src={item.questions_image_url} alt='Imagem da pergunta' />
              <div>
                {alternatives.map((alternative) => (
                  <div
                    key={alternative.alternatives_id}
                    onClick={() => handleAlternativeClick(alternative.alternatives_description, item.questions_correct_alternative)}
                    >
                    <p style={{
                      backgroundColor: selectedAlternative === alternative.alternatives_description ? ( isCorrect ? 'green' : 'red') : '#afb0b3',
                      cursor: 'pointer',
                    }} 
                    className='textAlternatives'><Latex>{alternative.alternatives_description}</Latex></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionPage;