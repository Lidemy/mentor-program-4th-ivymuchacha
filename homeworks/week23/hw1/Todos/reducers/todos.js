/* eslint-disable no-plusplus */
import {
  ADD_TODO,
  DELETE_TODO,
  MARK_TODO,
  CLEAR_TODO,
} from '../actionTypes';

const initialState = {
  todos: [],
};

let todoId = 0;

export default function todoReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false,
          },
        ],
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    }

    case MARK_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    case CLEAR_TODO: {
      return {
        ...state,
        todos: [],
      };
    }

    default: {
      return state;
    }
  }
}
