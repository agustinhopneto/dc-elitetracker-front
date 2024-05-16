import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { Plus } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from 'react-timer-hook';

import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Info } from '../../components/info';
import { api } from '../../services/api';
import styles from './styles.module.css';

type Timers = {
  focus: number;
  rest: number;
};

type FocusMetrics = {
  _id: [number, number, number];
  count: number;
};

type FocusTime = {
  _id: string;
  timeFrom: string;
  timeTo: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

enum TimerState {
  PAUSED = 'PAUSED',
  FOCUS = 'FOCUS',
  REST = 'REST',
}

const timerStateTitle = {
  [TimerState.PAUSED]: 'Pausado',
  [TimerState.FOCUS]: 'Em foco',
  [TimerState.REST]: 'Em descanso',
};

export function Focus() {
  const focusInput = useRef<HTMLInputElement>(null);
  const restInput = useRef<HTMLInputElement>(null);
  const [timers, setTimers] = useState<Timers>({ focus: 0, rest: 0 });
  const [timerState, setTimerState] = useState<TimerState>(TimerState.PAUSED);
  const [timeFrom, setTimeFrom] = useState<Date | null>(null);
  const [focusMetrics, setFocusMetrics] = useState<FocusMetrics>(
    {} as FocusMetrics,
  );
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(
    dayjs().startOf('month'),
  );

  function addSeconds(date: Date, seconds: number) {
    const time = dayjs(date).add(seconds, 'seconds');

    return time.toDate();
  }

  function handleStart() {
    restTimer.pause();

    const now = new Date();

    focusTimer.restart(addSeconds(now, timers.focus * 60));

    setTimeFrom(now);
  }

  async function handleEnd() {
    focusTimer.pause();

    await api.post('/focus-time', {
      timeFrom: timeFrom?.toISOString(),
      timeTo: new Date().toISOString(),
    });

    setTimeFrom(null);
  }

  const focusTimer = useTimer({
    expiryTimestamp: new Date(),
    async onExpire() {
      if (timerState !== TimerState.PAUSED) {
        await handleEnd();
      }
    },
  });

  const restTimer = useTimer({
    expiryTimestamp: new Date(),
  });

  function handleAddMinutes(type: 'focus' | 'rest') {
    if (type === 'focus') {
      const currentValue = Number(focusInput.current?.value);

      if (focusInput.current) {
        const value = currentValue + 5;
        focusInput.current.value = String(value);

        setTimers((old) => ({
          ...old,
          focus: value,
        }));
      }

      return;
    }

    const currentValue = Number(restInput.current?.value);

    if (restInput.current) {
      const value = currentValue + 5;
      restInput.current.value = String(value);

      setTimers((old) => ({
        ...old,
        rest: value,
      }));
    }
  }

  function handleCancel() {
    setTimers({
      focus: 0,
      rest: 0,
    });

    setTimerState(TimerState.PAUSED);

    if (focusInput.current) {
      focusInput.current.value = '';
    }

    if (restInput.current) {
      restInput.current.value = '';
    }
  }

  function handleFocus() {
    if (timers.focus <= 0 || timers.rest <= 0) {
      return;
    }

    handleStart();

    setTimerState(TimerState.FOCUS);
  }

  async function handleRest() {
    await handleEnd();

    const now = new Date();

    restTimer.restart(addSeconds(now, timers.rest * 60));

    setTimerState(TimerState.REST);
  }

  function handleResume() {
    handleStart();

    setTimerState(TimerState.FOCUS);
  }

  async function loadFocusMetrics(currentMonth: string) {
    const { data } = await api.get<FocusMetrics[]>('/focus-time/metrics', {
      params: {
        date: currentMonth,
      },
    });

    const [metrics] = data;

    setFocusMetrics(metrics || ({} as FocusMetrics));
  }

  async function handleSelectMonth(date: Date) {
    setCurrentMonth(dayjs(date));
  }

  useEffect(() => {
    loadFocusMetrics(currentMonth.toISOString());
  }, [currentMonth]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Tempo de Foco" />
        <div className={styles['input-group']}>
          <div className={styles.input}>
            <Plus onClick={() => handleAddMinutes('focus')} />
            <input
              ref={focusInput}
              placeholder="Tempo de foco"
              type="number"
              disabled
            />
          </div>

          <div className={styles.input}>
            <Plus onClick={() => handleAddMinutes('rest')} />
            <input
              ref={restInput}
              placeholder="Tempo de descanso"
              type="number"
              disabled
            />
          </div>
        </div>

        <div className={styles.timer}>
          <strong>{timerStateTitle[timerState]}</strong>
          {timerState === TimerState.PAUSED && (
            <span>{`${String(timers.focus).padStart(2, '0')}:00`}</span>
          )}

          {timerState === TimerState.FOCUS && (
            <span>{`${String(focusTimer.minutes).padStart(2, '0')}:${String(focusTimer.seconds).padStart(2, '0')}`}</span>
          )}

          {timerState === TimerState.REST && (
            <span>{`${String(restTimer.minutes).padStart(2, '0')}:${String(restTimer.seconds).padStart(2, '0')}`}</span>
          )}
        </div>

        <div className={styles['button-group']}>
          {timerState === TimerState.PAUSED && (
            <Button
              onClick={handleFocus}
              disabled={timers.focus <= 0 || timers.rest <= 0}
            >
              Começar
            </Button>
          )}
          {timerState === TimerState.FOCUS && (
            <Button onClick={handleRest}>Iniciar Descanso</Button>
          )}

          {timerState === TimerState.REST && (
            <Button onClick={handleResume}>Retomar</Button>
          )}
          <Button onClick={handleCancel} variant="error">
            Cancelar
          </Button>
        </div>
      </div>
      <div className={styles.metrics}>
        <h2>Estatísticas</h2>

        <div className={styles['info-container']}>
          <Info value={String(focusMetrics.count || 0)} label="Ciclos totais" />
          <Info value="120 minutos" label="Tempo total de foco" />
        </div>
        <div className={styles['calendar-container']}>
          <Calendar
            onMonthSelect={handleSelectMonth}
            onNextMonth={handleSelectMonth}
            onPreviousMonth={handleSelectMonth}
            renderDay={(date) => {
              const day = date.getDate();
              // const isSameDate = metrics?.completedDates?.some((item) =>
              //   dayjs(item).isSame(dayjs(date)),
              // );
              return (
                <Indicator
                  size={8}
                  color="var(--info)"
                  offset={-2}
                  // disabled={!isSameDate}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
