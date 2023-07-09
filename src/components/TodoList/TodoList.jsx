import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from './TodoList.module.css'

export default function TodoList({filter}) {
    
    const [todos, setTodos] = useState(() => readTodoFromLocalStorage());
    
    const handleAdd = (todo) => setTodos([
        ...todos,
        todo
    ]);

   const handleUpdate = (updated) => setTodos(
        todos.map((t) => (t.id === updated.id ? updated : t)) // 업데이트할 항목의 Id와 일치하는 경우에만 업데이트된 항목으로 교체
    );

    const handleDelete = (deleted) => setTodos(
        todos.filter((t) => t.id !== deleted.id) // 삭제할 항목의 id와 일치하지 않는 항목만 남긴다
    );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // todos, filter 값을 기반으로 필터링된 값들을 반환해서 filtered 변수에 담음
    const filtered = getFilteredItems(todos, filter);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item) => ( 
                    <Todo 
                        key={ item.id } 
                        todo={ item }
                        onUpdate={ handleUpdate }
                        onDelete={ handleDelete }
                    />
                ))}
            </ul>
            <AddTodo onAdd={ handleAdd }/>
        </section>
    )
}


// 할 일 목록 데이터 가져오기
function readTodoFromLocalStorage() {

    // localStorage에서 할 일 목록을 읽어옴 => 'todos'라는 키에 저장된 값을 가져옴
    const todos = localStorage.getItem('todos');
    
    // 가져온 값이 있으면 문자열을 javascript객체로 변환한후 반환하고, 없으면 빈 배열('[]')을 반환 
    return todos ? JSON.parse(todos) : [];

}


// 할 일 목록(todo)과 필터(filter)를 기반으로 필터링된 할 일 목록을 반환
function getFilteredItems(todos, filter) {
    if(filter === 'all') {
        return todos;
    }

    return todos.filter(todo => todo.status === filter)
}