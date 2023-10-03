import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ValidLogin(props) {

    function fechar(){ 
        props.fechar();
    }

  return (
    <>
      <Modal show={props.isVisible} className='modalAdmin'>
        <Modal.Header >
          <Modal.Title className='titleModalError'>senha ou usuario invalido!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <div className='bodyModal'>
                    <p>Confirme suas informações de acesso e tente novamente!</p>
                    <h5>lembre-se! não é permitido campos vazios.</h5>
                </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <div>
            <Button className='buttonConfirmar' variant="secondary" onClick={fechar}>
                Ok
            </Button>
        </div>
      </Modal>
    </>
  );
}