import React, { useState, useEffect} from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import { useNavigate, useParams } from 'react-router-dom';

const TopicsPage = (props) => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const { id, discipline } = useParams();
    const navigate = useNavigate();

    function topicsFromDiscipline(){
        fetch(Variaveis.urlBase + ":8080/topics/"+id).then(response => response.json()).then(
        date => {
            console.log(date);
            setData(date);
        });
    }

    function listQuestionFromTopics(item){
        navigate(`/questions/${item.topics_id}/${item.topics_name}`);
    }

    useEffect(() => { 
        setTitle("Topicos: " + discipline);
        topicsFromDiscipline();
    }, [])

    return (
        <>
            <Header titleProps={title}/>
            <div className='bodyTopics'>
            { data.map( (item) => 
                    <div className='blocoContainerTopics' onClick={() => {listQuestionFromTopics(item)}}>    
                        <div className='divComTexto'>
                            <p className='nameTopics'>{item.topics_name}</p>
                            <p className='descriptionTopics'>{item.topics_description}</p>
                        </div>
                    </div> 
                )}
            </div>  
        </>
    );           
}
export default TopicsPage;