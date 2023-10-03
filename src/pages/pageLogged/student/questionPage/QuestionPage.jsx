import React, { useState, useEffect} from 'react';
import Header from '../../../../componentes/header/Header';
import Variaveis from '../../../../componentes/global/Variaveis';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../../componentes/footer/Footer';

const QuestionPage = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const { id, topics } = useParams();

    function questionsFromTopics(){
        fetch(Variaveis.urlBase + ":8080/questions/"+id).then(response => response.json()).then(
        date => {
            console.log(date);
            setData(date);
        });
    }

    function questionDescription(item){
        var valor = item.questions_id;
        var element = document.getElementById(valor);
        if(element.style.display == "none" || element.style.display == "" ){
            element.style.display = "block";
            fetch(Variaveis.urlBase + ":8080/questions/"+id).then(response => response.json()).then(
                date => {
                    console.log(date);
                    setData(date);
                });
        }else{
            element.style.display = "none";
        }
    }

    useEffect(() => { 
        setTitle("topics: " + topics);
        questionsFromTopics();
    }, [])

    return (
        <>
            <Header titleProps={title}/>
            <div className='bodyTopics'>
            { data.map( (item) => 
                    <div className='blocoContainerTopics'>
                        <div className='divOpenVisor' onClick={() => {questionDescription(item)}}>
                            <div className='divComTexto'>
                                <p className='nameTopics'>{item.questions_name}</p>
                                <p className='teacherNameQuestions'>{item.questions_user_name}</p>
                                <p className='descriptionTopics'>{item.questions_description}</p>
                            </div>
                        </div> 
                        <div className='textEscondido' id={item.questions_id}>
                            <p>{item.questions_text}</p>
                            <img className='imgQuestion' src={item.questions_image_url}></img>
                            <div >
                                {item.questions_alternatives}
                            </div>
                        </div>
                    </div> 
                )}
            </div>  
            <Footer></Footer>
        </>
    );           
}
export default QuestionPage;