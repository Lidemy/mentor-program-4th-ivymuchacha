import {
  ADD_TODO,
  DELETE_TODO,
  MARK_TODO,
  CLEAR_TODO,
  SET_FILTER,
} from './actionTypes';

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function markTodo(id) {
  return {
    type: MARK_TODO,
    payload: {
      id,
    },
  };
}

export function clearTodo() {
  return {
    type: CLEAR_TODO,
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      filter,
    },
  };
}
