import { useState } from "react";

function useErrorHandler() {
  const [error, setError] = useState(null);

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    showError,
    clearError,
  };
}

export default useErrorHandler;
