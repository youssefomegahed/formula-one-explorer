'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AppState {
    pinnedRaces: string[];
    isCardView: boolean;
    toggleView: () => void;
    pinRace: (raceName: string) => void;
    unpinRace: (raceName: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [pinnedRaces, setPinnedRaces] = useState<string[]>([]);
    const [isCardView, setIsCardView] = useState(true);

    // Load pinned races and card view preference from localStorage on component mount
    useEffect(() => {
        const savedPinnedRaces = localStorage.getItem('pinnedRaces');
        const savedCardView = localStorage.getItem('isCardView');

        if (savedPinnedRaces) {
            setPinnedRaces(JSON.parse(savedPinnedRaces));
        }
        if (savedCardView !== null) {
            setIsCardView(JSON.parse(savedCardView));
        }
    }, []);

    // Toggle the card view and persist it in localStorage
    const toggleView = () => {
        setIsCardView((prev) => {
            const newValue = !prev;
            localStorage.setItem('isCardView', JSON.stringify(newValue));
            return newValue;
        });
    };

    const pinRace = (raceName: string) => {
        // assuming raceName is unique
        if (!pinnedRaces.includes(raceName)) {
            const updatedRaces = [...pinnedRaces, raceName];
            setPinnedRaces(updatedRaces);
            localStorage.setItem('pinnedRaces', JSON.stringify(updatedRaces));
        }
    };

    const unpinRace = (raceName: string) => {
        const updatedRaces = pinnedRaces.filter((name) => name !== raceName);
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
