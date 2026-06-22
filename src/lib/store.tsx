import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Creator } from '../types';
import { SEED_CREATORS } from './mockData';

interface StoreShape {
  creators: Creator[];
  currentCreatorId: string;
  setCurrentCreatorId: (id: string) => void;
  addCreator: (creator: Creator) => void;
  updateCreator: (id: string, patch: Partial<Creator>) => void;
  toggleAvailability: (id: string) => void;
}

const StoreContext = createContext<StoreShape | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [creators, setCreators] = useState<Creator[]>(SEED_CREATORS);
  const [currentCreatorId, setCurrentCreatorId] = useState<string>(SEED_CREATORS[0].id);

  const addCreator = (creator: Creator) => {
    setCreators((prev) => [...prev, creator]);
    setCurrentCreatorId(creator.id);
  };

  const updateCreator = (id: string, patch: Partial<Creator>) => {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const toggleAvailability = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isAvailable: !c.isAvailable } : c))
    );
  };

  return (
    <StoreContext.Provider
      value={{ creators, currentCreatorId, setCurrentCreatorId, addCreator, updateCreator, toggleAvailability }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function useCurrentCreator() {
  const { creators, currentCreatorId } = useStore();
  return creators.find((c) => c.id === currentCreatorId) ?? creators[0];
}
