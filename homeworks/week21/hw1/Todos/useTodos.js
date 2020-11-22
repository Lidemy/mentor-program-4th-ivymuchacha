/*eslint-disable*/
import { useState } from 'react';

let id = 1;
export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('All');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value) {
      setTodos([
        {
          id,
          content: value,
          isDone: false,
        }, ...todos,
      ]);
      setValue('');
      id += 1;
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleMark = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    }));
  };

  const handleClear = () => {
    setTodos([]);
    id = 1;
  };

  const handleFilter = (e) => {
    setFilter(e.target.innerHTML);
  };

  return {
    todos,
    setTodos,
    value,
    setValue,
    filter,
    setFilter,
    handleInputChange,
    handleAdd,
    handleDelete,
    handleMark,
    handleClear,
    handleFilter,
  };
}
