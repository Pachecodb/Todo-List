import React, { useEffect, useState } from "react";
import '././Form.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const getListaTarefas = () => {
    let list = localStorage.getItem('lista_tarefas')

    if (list) {
        return JSON.parse(localStorage.getItem('lista_tarefas'))
    } else {
        return []
    }
}

const Form = () => {

    const [listaTarefas, setListaTarefas] = useState('');
    const [tarefa, setTarefa] = useState(getListaTarefas());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [show, setShow] = useState(false);
    const [mostrarNoModal, setMostrarNoModal] = useState({title: '', name: ''});
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        localStorage.setItem('lista_tarefas', JSON.stringify(tarefa))
    }, [tarefa]);

    const addTarefa = () => {
        if (listaTarefas && !toggleSubmit) {
            setTarefa(
                tarefa.map((value) => {
                    if (value.id === isEditItem && listaTarefas.trim()) {
                        return { ...value, name: listaTarefas }
                    }

                    return value;
                })
            )
            setToggleSubmit(true);
            setListaTarefas('')
            setIsEditItem(null)
        } else {
            if (listaTarefas.trim()) {
                const todaListaTarefas = { id: new Date().getTime().toString(), name: listaTarefas }
                setTarefa([...tarefa, todaListaTarefas])
                setListaTarefas('')

            }
        }
    }
    // deleta elemento selecionado da lsita
        const deleteTarefa = (index) => {
            const deleteTarefa = tarefa.filter((value) => {
                return index !== value.id
            });
            setListaTarefas(deleteTarefa);
            handleClose();
        };

    const modalConfirmacao = (index) => {
        let modal = tarefa.find((value) => {
            return index === value.id
        });
        handleShow();
        setMostrarNoModal(modal);
    }

    const editTarefa = (id) => {
        let newEditItem = tarefa.find((value) => {
            return value.id === id;
        });
        setToggleSubmit(false);
        setListaTarefas(newEditItem.name);
        setIsEditItem(id);
    };

    return (
        <div className="App">
            <div>
                <h1> Todo-List</h1>
                <p>Gerencie sua tarefas!</p>
                <form className="was-validated" >
                    <input type="text" className="form-control" placeholder="Digite a tarefa" value={listaTarefas}
                        onChange={(e) => setListaTarefas(e.target.value)} autoFocus required />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Por favor insira a tarefa</div>
                    {
                        toggleSubmit ? <button type="button" className="btn btn-success" onClick={addTarefa}>Adicionar</button> : <button type="button" className="btn btn-primary" onClick={addTarefa}>Salvar Tarefa Editada</button>
                    }

                </form>
            </div>
            <div >
                {
                    tarefa.map((value) => {
                        return (
                            <div className="ex1" key={value.id}>
                                <h3 className="h3">{value.name}</h3>
                                <div>
                                    <button type="button" className="btn btn-warning" onClick={() => editTarefa(value.id)}>Editar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => modalConfirmacao(value.id)} >Excluir</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Voce realmente deseja excluir esta tafera? Essa ação sera ireversivel!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Tarefa: {mostrarNoModal.name}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteTarefa()} >Excluir</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Form;