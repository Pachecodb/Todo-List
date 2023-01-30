import React, { useEffect, useState } from "react";

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
                const todasListaTarefas = { id: new Date().getTime().toString(), name: listaTarefas }
                setTarefa([...tarefa, todasListaTarefas])
                setListaTarefas('')

            }
        }
    }
    // deleta elemento selecionado da lsita
    const deleteTarefa = (index) => {
        const deleteTarefa = tarefa.filter((value) => {
            return index !== value.id
        });
        setTarefa(deleteTarefa);
    };


    const editTarefa = (id) => {
        let newEditItem = tarefa.find((value) => {
            return value.id === id;
        });
        setToggleSubmit(false);
        setListaTarefas(newEditItem.name);
        setIsEditItem(id);
    };

    return (

        <div className="App" >
            <div >
                <div>
                    <h1> Lista de tarefas</h1>
                    <form className="was-validated" >
                        <input type="text" className="form-control" placeholder="Digite a tarefa" value={listaTarefas}
                            onChange={(e) => setListaTarefas(e.target.value)} autoFocus required />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Por favor insira a tarefa</div>
                        {
                            toggleSubmit ? <button type="button" className="btn btn-success" onClick={addTarefa}>Adicionar</button> : <button type="button" className="btn btn-success" onClick={addTarefa}>Adicionar Tarefa Editada</button>
                        }
                    </form>
                </div>
                <div>
                    {
                        tarefa.map((value) => {
                            return (
                                <div className="ex1" key={value.id}>
                                    <h3>{value.name}</h3>
                                    <div>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteTarefa(value.id)}>Excluir</button>
                                        <button type="button" className="btn btn-warning" onClick={() => editTarefa(value.id)}>Editar</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};
export default Form;