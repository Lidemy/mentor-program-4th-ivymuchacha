/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Input, Flex, Title, Wrapper,
} from './style';
import { selectTodos, selectFilters } from './selectors';
import {
  addTodo,
  deleteTodo,
  markTodo,
  clearTodo,
  setFilter,
} from './actions';
import Todo from './components/Todo';
import Filters from './components/Filters';

export default function App() {
  const todos = useSelector(selectTodos);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (value) {
      dispatch(addTodo(value));
      setValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleMarkTodo = (id) => {
    dispatch(markTodo(id));
  };

  const handleClearTodo = () => {
    dispatch(clearTodo());
  };

  const handleFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <Wrapper>
      <Title>To Do List</Title>
      <Filters handleFilter={handleFilter} handleClear={handleClearTodo} />
      <Flex>
        <Input value={value} onChange={handleInputChange} />
        <Button onClick={handleAddTodo}>Submit</Button>
      </Flex>
      {todos
        .filter((todo) => {
          if (filters === 'all') {
            return true;
          } if (filters === 'completed') {
            return todo.isDone;
          }
          return !todo.isDone;
        })
        .map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            handleDelete={handleDeleteTodo}
            handleMark={handleMarkTodo}
          />
        ))}
    </Wrapper>
  );
}
