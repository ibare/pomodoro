import { useState, useRef, useEffect } from 'react';
import { usePomodoroSettings } from './components/PomodoroSetting';
import { ms } from './utils';
import clsx from 'clsx';
import useSound from 'use-sound';
import DescriptionText from './components/Description';
import Button from './components/Button';
import Space from './components/Space';
import ActionSheet from './ActionSheet';
import Maybe from './components/Maybe';
import Settings from './Settings';
import soundNowLoading from '../public/now-loading.mp3';
import soundGameWon from '../public/game-won.mp3';
import soundVictory from '../public/victory.mp3';

type Phase = 'idle' | 'working' | 'break' | 'done';

const Pomodoro = () => {
  const [playNowLoading] = useSound(soundNowLoading);
  const [playGameWon] = useSound(soundGameWon);
  const [playVictory] = useSound(soundVictory);
  const { pomodoroCount, workMinutes, breakMinutes } = usePomodoroSettings();
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentCycle, setCurrentCycle] = useState(0); // #0, #1 ...
  const [elapsed, setElapsed] = useState(0);

  const TOTAL_CYCLES = pomodoroCount;
  const WORK_DURATION = ms(workMinutes);
  const BREAK_DURATION = ms(breakMinutes);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [isWorking, isBreaking, isIdle, isDone] = [
    phase === 'working', 
    phase === 'break', 
    phase === 'idle',
    phase === 'done',
  ]

  const currentDuration = isWorking ? WORK_DURATION : isBreaking ? BREAK_DURATION : 0;

  const update = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const delta = timestamp - startTimeRef.current;

    if (delta < currentDuration) {
      setElapsed(delta);
      requestRef.current = requestAnimationFrame(update);
    } else {
      setElapsed(currentDuration);

      if (isWorking) {
        if (currentCycle >= TOTAL_CYCLES) {
          playVictory();
          setPhase('done');
        } else {
          playGameWon();
          startTimeRef.current = null;      
          setElapsed(0);
          setPhase('break');
        }
      } else if (isBreaking) {
        if (currentCycle >= TOTAL_CYCLES) {
          playVictory();
          setPhase('done');
        } else {
          playNowLoading();
          startTimeRef.current = null;      
          setElapsed(0);
          setCurrentCycle((c) => c + 1);
          setPhase('working');
        }
      }

      cancelAnimationFrame(requestRef.current!);
    }
  };

  useEffect(() => {
    if (phase === 'working' || phase === 'break') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [phase]);

  const restartPomodoro = () => {
    setPhase('idle');
    setCurrentCycle(0);
  }

  const startPomodoro = () => {
    playNowLoading();
    setElapsed(0);
    startTimeRef.current = null;
    setPhase('working');
    setCurrentCycle((prev) => (phase === 'idle' ? prev + 1 : prev));
  };

  const formatTime = (millis: number) => {
    const duration = currentDuration;
    const remaining = isBreaking ? duration - millis : millis;
  
    const sec = Math.floor(remaining / 1000);
    const minutes = Math.floor(sec / 60).toString().padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');
    return { minutes, seconds };
  };

  const formatElapsed = formatTime(elapsed);

  return (
    <div className={clsx(
      'flex flex-col justify-between min-h-screen w-full p-8 text-center',
      {
        'bg-white text-black': !isBreaking,
        'bg-gray-800 text-gray-200': isBreaking,
      }
    )}>
      <div>
        <Space size={4} />
        <Maybe test={!isIdle}>
          <div className="text-2xl font-thin text-gray-400">#{currentCycle}</div>
        </Maybe>
        <Maybe test={isDone}>
          <div className="text-[10em] font-thin">🥳</div>
        </Maybe>
        <Space size={4} />
        <Maybe test={!isDone}>
          <div className="text-[10em] font-thin">{formatElapsed.minutes}</div>
          <Maybe test={isWorking || isBreaking}>
            <div className="text-6xl font-thin text-cyan-400">{formatElapsed.seconds}</div>
          </Maybe>
        </Maybe>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Maybe test={isBreaking}>
          <div className="text-lg font-semibold text-green-600">You’ve earned a breather 😌</div>
        </Maybe>

        <Maybe test={isDone}>
          <div className="text-lg font-semibold text-green-600">All Done!</div>
          <Button click={restartPomodoro} type="text" label="Restart" />
        </Maybe>
        <DescriptionText>{`${pomodoroCount} times, ${workMinutes} to ${breakMinutes} minutes`}</DescriptionText>
        <Space size={4} />
        <Maybe test={isIdle && currentCycle < TOTAL_CYCLES}>
          <Button click={startPomodoro} label="Start" />
          <Button click={() => setSettingOpen(true)} type="text" label="Setting" />
        </Maybe>
        <Space size={12}/>
        <DescriptionText>© JinSoft</DescriptionText>
      </div>
      <ActionSheet isOpen={isSettingOpen} onClose={() => setSettingOpen(false)}>
        <Settings />
      </ActionSheet>
    </div>
  );
};

export default Pomodoro;
