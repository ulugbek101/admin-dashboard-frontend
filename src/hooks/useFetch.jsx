import {useState} from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const BASE_URL = 'http://127.0.0.1:8000/api/v1/'

    const sendHttpRequest = async (url, options) => {
        try {
            setIsLoading(true);

            // Make the API call using fetch
            const response = await fetch(BASE_URL + url, options);

            if (!response.ok) {
                return {status: response.status, errorMessage: response.statusText}
            }

            const result = await response.json();

            // Reset states on successful submission
            setError(null);
            return result;

        } catch (error) {
            throw error; // Re-throw the error for the component to handle if needed

        } finally {
            setIsLoading(false);
        }
    };

    return {isLoading, error, sendHttpRequest};
};

export default useFetch;