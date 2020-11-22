/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Todos from './Todo';
import useTodos from './useTodos';
import {
  Button, Input, Filter, Flex, Title, Wrapper, ClearAll,
} from './style';

function Filters({ handleClear, handleFilter }) {
  return (
    <div>
      <Flex>
        <Filter onClick={handleFilter}>All</Filter>
        <Filter onClick={handleFilter}>Completed</Filter>
        <Filter onClick={handleFilter}>Undone</Filter>
        <ClearAll onClick={handleClear}>Clear All</ClearAll>
      </Flex>
    </div>
  );
}

function Inputs({ value, onChange, handleAdd }) {
  return (
    <div>
      <Input value={value} onChange={onChange} />
      <Button onClick={handleAdd}>Submit</Button>
    </div>
  );
}

function App() {
  const {
    todos,
    value,
    filter,
    handleInputChange,
    handleAdd,
    handleDelete,
    handleMark,
    handleClear,
    handleFilter,
  } = useTodos();

  return (
    <div className="App">
      <Wrapper>
        <Title>To Do List</Title>
        <Filters handleClear={handleClear} handleFilter={handleFilter} />
        <Inputs value={value} onChange={handleInputChange} handleAdd={handleAdd} />
        {
          todos.filter((todo) => {
            if (filter === 'Completed') {
              return todo.isDone;
            } if (filter === 'Undone') {
              return !todo.isDone;
            }
            return true;
          }).map(todo => (
            <Todos
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleMark={handleMark}
            />
          ))
        }
      </Wrapper>
    </div>
  );
}

export default App;
