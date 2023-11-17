import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Variaveis from '../global/Variaveis';

const Header = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  const match = Variaveis.email.match(/@(.+)/);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function topcs() {
    if (match[0] === '@uricer.edu.br') {
      return navigate('/professor');
    } else {
      return navigate('/aluno');
    }
  }

  function helpMe() {
    
    handleShow();
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="nameNav">
          <a className="navbar-brand" href="/">
            MathematizingWithJudge
          </a>
        </div>
        <h5 className="tituloHome">{props.titleProps}</h5>
        <div className="listHome">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button type="button" className="btn btn-dark" onClick={topcs}>
                Topicos
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-dark" onClick={helpMe}>
                help
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{match[0] === '@uricer.edu.br' ? 'Olá, professor!' : 'Olá, aluno!'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {match[0] === '@uricer.edu.br' ? (
            <>
        <h6>Operadores Básicos:</h6>
        <ul>
          <li>Adição: {'+'}</li>
          <li>Subtração: {'-'}</li>
          <li>Multiplicação: {'* ou \cdot'}</li>
          <li>Divisão: {'/'}</li>
        </ul>

        <h6>Exponenciação e Índices:</h6>
        <ul>
          <li>Exponenciação: {'^'}</li>
          <li>Subescrita (índice): {'_'}</li>
        </ul>

        <h6>Raízes:</h6>
        <ul>
          <li>Raiz quadrada: {'\\sqrt{x}'}</li>
          <li>Raiz cúbica: {'\\sqrt[3]{x}'}</li>
          <li>Outras raízes: {'\\\sqrt[n]{x}'}</li>
        </ul>

        <h6>Frações:</h6>
        <ul>
          <li>Fração: {'\\frac{numerador}{denominador}'}</li>
        </ul>

        <h6>Funções Trigonométricas:</h6>
        <ul>
          <li>Seno: {'\\sin(x)'}</li>
          <li>Cosseno: {'\\cos(x)'}</li>
          <li>Tangente: {'\\tan(x)'}</li>
          <li>Cotangente: {'\\cot(x)'}</li>
          <li>Secante: {'\\sec(x)'}</li>
          <li>Cossecante: {'\\csc(x)'}</li>
        </ul>

        <h6>Funções Logarítmicas:</h6>
        <ul>
          <li>Logaritmo natural: {'\\ln(x)'}</li>
          <li>Logaritmo com base 10: {'\\log(x)'}</li>
          <li>Logaritmo com base qualquer: {'\\log_{a}(x)'}</li>
        </ul>

        <h6>Funções Exponenciais:</h6>
        <ul>
          <li>Exponencial: {'e^{x}'}</li>
        </ul>

        <h6>Somatório e Produtório:</h6>
        <ul>
          <li>Somatório: {'\\sum_{i=1}^{n} expression'}</li>
          <li>Produtório: {'\\prod_{i=1}^{n} expression'}</li>
        </ul>

        <h6>Integrais:</h6>
        <ul>
          <li>Integral definida: {'\\int_{a}^{b} expression dx'}</li>
          <li>Integral indefinida: {'\\int expression dx'}</li>
        </ul>

        <h6>Parênteses e Colchetes:</h6>
        <ul>
          <li>Parênteses: {'( )'}</li>
          <li>Colchetes: {'[ ]'}</li>
          <li>Chaves: {'\\{ \\}'}</li>
        </ul>

        <h6>Limites:</h6>
        <ul>
          <li>Limite: {'\\lim_{x \\to a} expression'}</li>
        </ul>

        <h6>Equações e Alinhamento:</h6>
        <ul>
          <li>Equação: {'\\[equation\\] ou \\[equation\\]'}</li>
          <li>Alinhamento de equações: {'\\begin{align} ... \\end{align}'}</li>
        </ul>

        <h6>Letras Gregas:</h6>
        <ul>
          <li>Alpha: {'\\alpha'}</li>
          <li>Beta: {'\\beta'}</li>
          <li>Gama: {'\\gamma'}</li>
          <li>Delta: {'\\delta'}</li>
          <li>Epsilon: {'\\epsilon'}</li>
          <li>Zeta: {'\\zeta'}</li>
          <li>Eta: {'\\eta'}</li>
          <li>Teta: {'\\theta'}</li>
          <li>Iota: {'\\iota'}</li>
          <li>Kappa: {'\\kappa'}</li>
          <li>Lambda: {'\\lambda'}</li>
          <li>Mi: {'\\mu'}</li>
          <li>Ni: {'\\nu'}</li>
          <li>Xi: {'\\xi'}</li>
          <li>Ômicron: {'\\omicron ou o'}</li>
          <li>Pi: {'\\pi'}</li>
          <li>Rô: {'\\rho'}</li>
          <li>Sigma: {'\\sigma'}</li>
          <li>Tau: {'\tau'}</li>
          <li>Úpsilon: {'\\upsilon'}</li>
          <li>Phi: {'\\phi ou \varphi'}</li>
          <li>Chi: {'\\chi'}</li>
          <li>Psi: {'\\psi'}</li>
          <li>Ômega: {'\\omega'}</li>
        </ul>

        <h6>Relações Matemáticas:</h6>
        <ul>
          <li>Igual: {'='}</li>
          <li>Não igual: {'\\neq'}</li>
          <li>Menor que: {'<'}</li>
          <li>Maior que: {'>'}</li>
          <li>Menor ou igual a: {'\\leq'}</li>
          <li>Maior ou igual a: {'\\geq'}</li>
        </ul>

        <h6>Outros Símbolos Matemáticos:</h6>
        <ul>
          <li>Pertence a: {'\\in'}</li>
          <li>Não pertence a: {'\\notin'}</li>
          <li>Para todo: {'\\forall'}</li>
          <li>Existe: {'\\exists'}</li>
          <li>Conjunto vazio: {'\\emptyset'}</li>
        </ul>
      </>
          ) : (
            // Conteúdo específico para alunos
            <p>Aqui está uma mensagem especial para os alunos.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;