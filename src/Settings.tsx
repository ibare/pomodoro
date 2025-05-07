import React from 'react';
import { usePomodoroSettings } from './components/PomodoroSetting';

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ label, value, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center justify-center space-x-8">
        <button onClick={onDecrement} className="text-3xl px-4 select-none">−</button>
        <span className="text-5xl font-light">{value}</span>
        <button onClick={onIncrement} className="text-3xl px-4 select-none">＋</button>
      </div>
      <span className="text-sm text-black">{label}</span>
    </div>
  );
};

const Settings = () => {
  const { 
    pomodoroCount, 
    workMinutes, 
    breakMinutes, 
    setPomodoroCount, 
    setWorkMinutes, 
    setBreakMinutes 
  } = usePomodoroSettings();

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <Counter
        label="Times"
        value={pomodoroCount}
        onIncrement={() => setPomodoroCount(pomodoroCount + 1)}
        onDecrement={() => setPomodoroCount(pomodoroCount <= 1 ? pomodoroCount : pomodoroCount - 1)}
      />
      <Counter
        label="Pomodoro Minutes"
        value={workMinutes}
        onIncrement={() => setWorkMinutes(workMinutes + 5)}
        onDecrement={() => setWorkMinutes(workMinutes <= 5 ? workMinutes : workMinutes - 5)}
      />
      <Counter
        label="Break Minutes"
        value={breakMinutes}
        onIncrement={() => setBreakMinutes(breakMinutes + 1)}
        onDecrement={() => setBreakMinutes(breakMinutes <= 1 ? breakMinutes : breakMinutes - 1)}
      />
    </div>
  );
};

export default Settings;
