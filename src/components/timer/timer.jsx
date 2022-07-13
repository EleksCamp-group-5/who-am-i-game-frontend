import { useState } from 'react';
import convertTime from '../../helper-functions/convert-time';
import './timer.scss';
import useTimer from '../../hooks/useTimer';

function Timer({ time = 0 }) {
  const [seconds, setSeconds] = useState(time);

  useTimer(() => setSeconds((seconds) => seconds + 1));

  return (
    <div className="timer">
      <p className="timer__start">GAME START</p>
      <div className="timer__time">{convertTime(seconds)}</div>
    </div>
  );
}

export default Timer;
