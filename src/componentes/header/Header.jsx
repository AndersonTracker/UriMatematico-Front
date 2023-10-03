import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    function topcs(){
        return navigate("/aluno");
    }

    function helpMe(){
        return navigate("/help");
    }

    return (
        <>
           <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className='nameNav'>
                    <a className="navbar-brand" href="/">MathematizingWithJudge</a>
                </div>
                <h5 className='tituloHome'>{props.titleProps}</h5>
                <div className='listHome'>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <button type="button" className="btn btn-dark" onClick={topcs}>Topicos</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-dark" onClick={helpMe}>help</button>
                        </li>
                    </ul>
                </div>
            </nav>   
        </>
    );           
}
export default Header;