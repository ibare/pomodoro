import React, { createContext, useContext, useState } from 'react';

type PomodoroSettingsContextType = {
  pomodoroCount: number;
  workMinutes: number;
  breakMinutes: number;
  setPomodoroCount: (newCount: number) => void;
  setWorkMinutes: (newMinutes: number) => void;
  setBreakMinutes: (newMinutes: number) => void;
};

const DEFAULT_SETTINGS = {
  pomodoroCount: 4,
  workMinutes: 25,
  breakMinutes: 5,
};

const PomodoroSettingsContext = createContext<PomodoroSettingsContextType | null>(null);

export const PomodoroSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pomodoroCount, setPomodoroCount] = useState(DEFAULT_SETTINGS.pomodoroCount);
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_SETTINGS.workMinutes);
  const [breakMinutes, setBreakMinutes] = useState(DEFAULT_SETTINGS.breakMinutes);

  return (
    <PomodoroSettingsContext.Provider value={{ pomodoroCount, workMinutes, breakMinutes, setPomodoroCount, setWorkMinutes, setBreakMinutes }}>
      {children}
    </PomodoroSettingsContext.Provider>
  );
};

export const usePomodoroSettings = () => {
  const context = useContext(PomodoroSettingsContext);
  if (!context) throw new Error('usePomodoroSettings must be used within PomodoroSettingsProvider');
  return context;
};
