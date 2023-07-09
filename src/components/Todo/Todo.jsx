import React from "react";
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Todo.module.css'

export default function Todo({todo, onUpdate, onDelete}) {

    const handleChange = (e) => {
        
        const status = e.target.checked ? 'completed' : 'active';

        onUpdate({
            ...todo,
            status: status
        })
    }

    const handleDelete = () => onDelete(todo);

    return (
        <li className={styles.todo}>
            <input 
                className={styles.checkbox}
                type="checkbox"
                id="checkbox"
                checked={todo.status === 'completed'}
                onChange={handleChange}
            />
            <lable 
                htmlFor="checkbox"
                className={styles.text}
            >
                {todo.text}
            </lable>
            <span
                className={styles.icon}
            >
                <button 
                    onClick={handleDelete}
                    className={styles.button}
                >
                    <FaTrashAlt />
                </button>
            </span>
        </li>
    )
}