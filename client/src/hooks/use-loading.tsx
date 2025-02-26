import React, { createContext, useContext, useState, ReactNode } from "react";

export type LoadingStateType = {
  home: boolean;
  services: boolean;
  blog: boolean;
  contact: boolean;
  pricing: boolean;
  websiteAnalysis: boolean;
  featuresSection: boolean;
  faqSection: boolean;
};

interface LoadingContextType {
  isLoading: LoadingStateType;
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingStateType>>;
  startLoading: (section: keyof LoadingStateType) => void;
  stopLoading: (section: keyof LoadingStateType) => void;
  simulateLoading: (section: keyof LoadingStateType, timeMs?: number) => void;
}

const initialLoadingState: LoadingStateType = {
  home: false,
  services: false,
  blog: false,
  contact: false,
  pricing: false,
  websiteAnalysis: false,
  featuresSection: false,
  faqSection: false
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<LoadingStateType>(initialLoadingState);

  const startLoading = (section: keyof LoadingStateType) => {
    setIsLoading(prev => ({ ...prev, [section]: true }));
  };

  const stopLoading = (section: keyof LoadingStateType) => {
    setIsLoading(prev => ({ ...prev, [section]: false }));
  };

  // Function to simulate loading for demos or testing
  const simulateLoading = (section: keyof LoadingStateType, timeMs: number = 2000) => {
    startLoading(section);
    setTimeout(() => {
      stopLoading(section);
    }, timeMs);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading, simulateLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};