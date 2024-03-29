import { combineReducers } from 'redux';
import { statusFilters } from './constants';
const taskInitialState = [
  { id: 0, toDo: 'Learn HTML and CSS', checked: true },
  { id: 1, toDo: 'Get good at JavaScript', checked: true },
  { id: 2, toDo: 'Master React', checked: false },
  { id: 3, toDo: 'Discover Redux', checked: false },
  { id: 4, toDo: 'Build amazing apps', checked: false },
];

const taskReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    case 'task/addTask': {
      if (state.some(el => el.toDo.toLowerCase() === action.payload.toDo.toLowerCase().trim())) {
        alert('This to do item is already in list!');
        return [...state];
      }

      return [...state, action.payload];
    }
    case 'task/deleteTask': {
      return [...state.filter(task => task.id !== action.payload)];
    }
    case 'task/toggleCompleted': {
      return [
        ...state.map(task => {
          if (task.id !== action.payload) {
            return task;
          }
          return { ...task, checked: !task.checked };
        }),
      ];
    }
    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter': {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: taskReducer,
  filters: filtersReducer,
});
