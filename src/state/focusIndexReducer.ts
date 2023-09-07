import { DEFAULT_INDEX } from '../components/search/SearchIndex';

interface Action {
  type: 'INDEX_INCREMENT' | 'INDEX_DECREMENT' | 'INDEX_RESET';
}

export const focusIndexReducer = (focusIndex: number, action: Action) => {
  switch (action.type) {
    case 'INDEX_INCREMENT':
      return focusIndex + 1;
    case 'INDEX_DECREMENT':
      return focusIndex - 1;
    case 'INDEX_RESET':
      return (focusIndex = DEFAULT_INDEX);
    default:
      return focusIndex;
  }
};
