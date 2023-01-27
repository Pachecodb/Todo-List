import React, { useEffect, useState } from "react";

export default function Form() {

    const [listaTarefas, setListaTarefas] = useState([]);
    const [tarefa, setTarefa] = useState('');



    function addTarefa() {

        if (!tarefa) { // < ---se não tiver vazio, nao faz nada
            return
        };
        // add novo elemento a lista
        listaTarefas.push({ text: tarefa })
        setListaTarefas(listaTarefas);
        localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas));
        setTarefa(''); // <--- reseta o valor do input
    }

    // deleta elemento selecionado da lsita
    function deleteTarefa(index) {
        listaTarefas.splice(index, 1);
        setListaTarefas([...listaTarefas]);
        localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas));
    }
    useEffect(() => {
        if (localStorage.getItem('lista_tarefas') !== null) {
            setListaTarefas(JSON.parse(localStorage.getItem('lista_tarefas')))
        }
    }, []);

    function openEditTarefa(text) {
        // Resgatando o texto da tarefa para mostrar no campo
        const tarefaAtual = listaTarefas[text];
        // Aqui atribui o valor ao estado para que seja mostrado no campo de texto na edição
        setTarefa(tarefaAtual.text);
    }


    return (
        <>
            <h3>Todo-List</h3>
            <hr />
            <input type="text" placeholder="Digite a tarefa" value={tarefa} onChange={(e) => { setTarefa(e.target.value) }} />
            <button onClick={addTarefa}>Adicionar</button>
            <input type="text" value={tarefa} onChange={(e) => { setTarefa(e.target.value) }}></input>
            <button >Editar</button>
            <hr />
            {listaTarefas.map((t, index) => {
                return <li key={index}>{t.text}
                    <span
                        onClick={() => { deleteTarefa(index) }}>[remover]
                    </span>
                    <span onClick={() => { openEditTarefa(index) }}>[editar]</span>
                </li>
            })}

        </>
    );
};
