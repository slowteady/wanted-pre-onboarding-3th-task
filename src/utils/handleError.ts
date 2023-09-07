import { ERROR_MESSAGES } from '../hooks/useRequest';

const handleError = (error: Error | unknown) => {
  const errorMessage = error instanceof Error ? `Error: ${error.message}` : ERROR_MESSAGES;
  alert(errorMessage);
};

export default handleError;
