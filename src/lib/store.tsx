import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Creator, AuthUser } from '../types';

interface StoreShape {
  creators: Creator[];
  authUser: AuthUser | null;
  currentCreatorId: string | null;
  setCurrentCreatorId: (id: string) => void;
  setAuthUser: (user: AuthUser | null) => void;
  addCreator: (creator: Creator) => void;
  updateCreator: (id: string, patch: Partial<Creator>) => void;
  toggleAvailability: (id: string) => void;
}

const StoreContext = createContext<StoreShape | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [currentCreatorId, setCurrentCreatorId] = useState<string | null>(null);

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
      value={{ creators, authUser, currentCreatorId, setCurrentCreatorId, setAuthUser, addCreator, updateCreator, toggleAvailability }}
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
  if (!currentCreatorId) return null;
  return creators.find((c) => c.id === currentCreatorId) ?? null;
}