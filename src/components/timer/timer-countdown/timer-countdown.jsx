import { useState, useEffect, useRef } from 'react';
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
  disableSessionTracker,
}) {
  const [seconds, setSeconds] = useState(time);
  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (disableSessionTracker) {
      return;
    }
    const sessionTimer = sessionStorage.getItem('timer');

    if (sessionTimer) {
      const { seconds, time } = JSON.parse(sessionTimer);
      const diff = new Date().getTime() - time;
      const result = seconds - Math.floor(diff / 1000);

      setSeconds(result > 0 ? result : 0);

      if (firstRenderRef.current || process.env.NODE_ENV === 'production') {
        sessionStorage.removeItem('timer');
      }
    } else {
      setSeconds(time);
    }

    function onBeforeUnload(e) {
      console.log(
        '%ctimer-countdown.jsx line:41 object',
        'color: #007acc;',
        'before unload'
      );
      setSeconds((seconds) => {
        sessionStorage.setItem(
          'timer',
          JSON.stringify({ seconds, time: new Date().getTime() })
        );

        return seconds;
      });
    }

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      firstRenderRef.current = true;
    };
  }, [disableSessionTracker, time]);

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
