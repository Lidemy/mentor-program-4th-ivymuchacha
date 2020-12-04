/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Flex = styled.div`
  display: flex;
  position: relative;
`;
const Filter = styled.div`
  font-size: 15px;
  padding: 5px 10px;
  border: solid 1px #2b9392;
  border-radius: 5px;
  margin: 10px 5px;
  background: #50b8b1;
  color: white;
  cursor: pointer;
`;

const TodoList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  border-bottom: solid 1px #255060;
`;

const Todo = styled.div`
  display: flex;
  margin: auto 5px;
  color: #253243;
  font-size: 18px;
`;

const State = styled.div`
  margin-right: 15px;
  font-weight: bold;
`;

export default function Todos({ todo, handleDelete, handleMark }) {
  const deleteTodo = () => {
    handleDelete(todo.id);
  };

  const markTodo = () => {
    handleMark(todo.id);
  };

  return (
    <TodoList>
      <Todo>
        <State>{todo.isDone ? 'Ｏ' : 'Ｘ'}</State>
        {todo.content}
      </Todo>
      <Flex>
        <Filter onClick={markTodo}>{todo.isDone ? '已完成' : '未完成'}</Filter>
        <Filter onClick={deleteTodo}>刪除</Filter>
      </Flex>
    </TodoList>
  );
}

Todos.propTypes = {
  todo: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMark: PropTypes.func.isRequired,
};
