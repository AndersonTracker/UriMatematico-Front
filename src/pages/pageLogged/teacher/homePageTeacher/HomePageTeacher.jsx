import React, { useState, useEffect} from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import {useNavigate} from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const HomePageTeacher = () => {
    const [title] = useState("Professor Topicos");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    function topics(){
        fetch(Variaveis.urlBase + ":8080/topics").then(response => response.json()).then(
        date => {
            console.log(date);
            setData(date);
        });
    }

    function editarTopic(item){
        navigate(`/topicsEdit/${item.topics_id}`);
    }

    function createTopics(){
        navigate("/createNewTopics");
    }

    function questionForTopics(id, name){
        navigate(`/questionsView/${id}/${name}`);
    }

    function deleteTopic(item){
        fetch(Variaveis.urlBase + ":8080/topics/"+item.topics_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                topics();
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
        topics();
    }, [])

    return (
        <>
            <Header titleProps={title}/>
            <div class="newElement">
                <button className='buttonNewElement' onClick={() => {createTopics()}}>New Topics</button>
            </div>
            <div className='bodyTeacker'>
                { data.map( (item) => 
                    <div className='blocoContainer' >    
                        <div className='divBotEditDelete'>
                            <GrEdit className='botãoEdit' onClick={() => {editarTopic(item)}}></GrEdit>
                            <MdDeleteOutline className='botãoDelete' onClick={() => {deleteTopic(item)}}></MdDeleteOutline>
                        </div>
                        <div className='divComTexto' onClick={() => {questionForTopics(item.topics_id, item.topics_name)}}>
                            <h1 className='titleDisciplineName'>{item.topics_discipline_name}</h1>
                            <p className='nameDiscipline'>{item.topics_name}</p>
                            <p className='descriptionDiscipline'>{item.topics_description}</p>
                        </div>
                        <div className='teacherName' onClick={() => {questionForTopics(item.topics_id, item.topics_name)}}>
                            <p className='texto-direita'>{item.topics_user_name}</p>
                        </div>
                    </div> 
                )}
            </div>  
        </>
    );           
}
export default HomePageTeacher;