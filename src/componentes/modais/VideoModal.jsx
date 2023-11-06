import React, { useState } from 'react';
import Modal from 'react-modal';

// Estilos para o modal (você pode personalizá-los)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth: '800px',
  },
};

// Componente de Modal
export function VideoModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={customStyles}
      contentLabel="Video Modal"
    >
      <h2>Alternativa errada!</h2>
      <p>Veja um video referente ao conteudo e tente novamente.</p>
      <div>
        <iframe 
          width="560" 
          height="315" 
          src={props.urlVideo} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>
      <button onClick={props.onClose}>Fechar</button>
    </Modal>
  );
}