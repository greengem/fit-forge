'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import Confetti from 'react-confetti';

interface ConfettiContextType {
  startConfetti: () => void;
  stopConfetti: () => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined);

export const useConfetti = (): ConfettiContextType => {
  const context = useContext(ConfettiContext);
  if (context === undefined) {
    throw new Error('useConfetti must be used within a ConfettiProvider');
  }
  return context;
};

interface ConfettiProviderProps {
  children: ReactNode;
}

export const ConfettiProvider = ({ children }: ConfettiProviderProps) => {
  const [confetti, setConfetti] = useState<boolean>(false);

  const startConfetti = () => setConfetti(true);
  const stopConfetti = () => setConfetti(false);

  return (
    <ConfettiContext.Provider value={{ startConfetti, stopConfetti }}>
      {children}
      {confetti && <Confetti />}
    </ConfettiContext.Provider>
  );
};
