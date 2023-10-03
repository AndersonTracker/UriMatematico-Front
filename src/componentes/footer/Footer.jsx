import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Footer = (props) => {
    const navigate = useNavigate();

    

    function register(){
        
    }

    return (
        <>
          <div className='footer'>
            <p className='completed'>completou todas as questões ? </p>
            <div className='botãoSubmitTest'>
              <p className='verificarTeste'>
                submit!
              </p>
            </div>
          </div>
        </>
    );           
}
export default Footer;