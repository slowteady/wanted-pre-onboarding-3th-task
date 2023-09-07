import { DEFAULT_INDEX } from '../components/search/SearchIndex';

interface Action {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET';
}

export const focusIndexReducer = (focusIndex: number, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return focusIndex + 1;
    case 'DECREMENT':
      return focusIndex - 1;
    case 'RESET':
      return (focusIndex = DEFAULT_INDEX);
    default:
      return focusIndex;
  }
};
