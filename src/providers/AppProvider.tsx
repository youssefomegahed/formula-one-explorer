'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppState {
    pinnedRaces: string[];
    isCardView: boolean;
    toggleView: () => void;
    pinRace: (raceId: string) => void;
    unpinRace: (raceId: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [pinnedRaces, setPinnedRaces] = useState<string[]>([]);
    const [isCardView, setIsCardView] = useState(false);

    const toggleView = () => setIsCardView((prev) => !prev);

    const pinRace = (raceId: string) => {
        if (!pinnedRaces.includes(raceId)) {
            setPinnedRaces((prev) => [...prev, raceId]);
            localStorage.setItem('pinnedRaces', JSON.stringify([...pinnedRaces, raceId]));
        }
    };

    const unpinRace = (raceId: string) => {
        const updatedRaces = pinnedRaces.filter((id) => id !== raceId);
        setPinnedRaces(updatedRaces);
        localStorage.setItem('pinnedRaces', JSON.stringify(updatedRaces));
    };

    return (
        <AppContext.Provider value={{ pinnedRaces, isCardView, toggleView, pinRace, unpinRace }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppProvider');
    return context;
};
