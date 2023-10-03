import React, { useState, useEffect} from 'react';
import Header from '../../componentes/header/Header';
import Variaveis from '../../componentes/global/Variaveis';

const HomePage = () => {
    const [title] = useState("Seja bem vindo! a nossa plataforma de ensino Matematico."); 
    
    useEffect(() => { 
        //pega a sessão
    }, [])

    return (
        <>
           <div className='bodyPage'>
            <Header titleProps={title}/>
            <div className='introductionHome'>
                <p className='guia'>imagem</p>
                <p className='guia'>introdução</p>

            </div>
           </div>
        </>
    );           
}
export default HomePage;