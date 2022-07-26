import { useState, useEffect } from 'react';
import convertTime from '../../../helper-functions/convert-time';
import clsx from 'clsx';
import '../timer.scss';
import useTimer from '../../../hooks/useTimer';

function CountdownTimer({
  inLobby,
  time = 60,
  small,
  timeClassName,
  paused,
  onFinish,
  reset,
}) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    setSeconds(time);
  }, [time, reset]);

  useTimer(() => {
    if (paused || seconds === 0) {
      return;
    }

    setSeconds((seconds) => seconds - 1);
  });

  useEffect(() => {
    if (seconds === 0) {
      if (onFinish) {
        onFinish();
      }
      setSeconds(time);
    }
  }, [onFinish, seconds, time]);

  return (
    <div className="timer">
      <p className={clsx('timer__start', [inLobby, small])}>GAME START</p>
      <div
        className={clsx('timer__time', { 'time-small': small }, timeClassName)}
      >
        {convertTime(seconds)}
      </div>
    </div>
  );
}

export default CountdownTimer;
