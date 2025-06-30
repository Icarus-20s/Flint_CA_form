// src/context/LoadingContext.jsx
import React, { createContext, useContext, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

// Create a context for loading state
const LoadingContext = createContext({
    isLoading: false,
    startLoading: () => {},
    stopLoading: () => {},
    setLoadingMessage: () => {},
});

// Create a provider component
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    const startLoading = (message) => {
        if (message) setLoadingMessage(message);
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
        // Reset message after a short delay
        setTimeout(() => {
            setLoadingMessage("Loading...");
        }, 500);
    };

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                startLoading,
                stopLoading,
                setLoadingMessage,
            }}
        >
            {children}
            {isLoading && <LoadingSpinner message={loadingMessage} />}
        </LoadingContext.Provider>
    );
};

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);
