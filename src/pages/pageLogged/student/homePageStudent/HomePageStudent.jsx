import React, { useState, useEffect} from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import {useNavigate} from 'react-router-dom';

const HomePageStudent = () => {
    const [title] = useState("estudante");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    function topics(){
        fetch(Variaveis.urlBase + ":8080/topics").then(response => response.json()).then(
        date => {
            console.log(date);
            setData(date);
        });
    }

    function questionForTopics(id, name){
        navigate(`/questions/${id}/${name}`);
    }

    useEffect(() => { 
        topics();
    }, [])

    return (
        <>
            <Header titleProps={title}/>
            <div className='bodyDisciplines'>
                { data.map( (item) => 
                    <div className='blocoContainer' onClick={() => {questionForTopics(item.topics_id, item.topics_name)}}>    
                        <div className='divComTexto'>
                            <h1 className='titleDisciplineName'>{item.topics_discipline_name}</h1>
                            <p className='nameDiscipline'>{item.topics_name}</p>
                            <p className='descriptionDiscipline'>{item.topics_description}</p>
                        </div>
                        <div className='teacherName'>
                            <p >{item.topics_user_name}</p>
                        </div>
                    </div> 
                )}
            </div>  
        </>
    );           
}
export default HomePageStudent;