import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import convertTime from '../../../helper-functions/convert-time';
import clsx from 'clsx';
import '../timer.scss';
import { INACTIVE } from '../../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../../contexts/game-data-context';
import { leaveGame } from '../../../services/games-service';
import useTimer from '../../../hooks/useTimer';

function CountdownTimer({ inLobby, time = 60, small, timeClassName, paused }) {
  const { gameData, resetData, playerId } = useContext(GameDataContext);
  const [seconds, setSeconds] = useState(time);
  const navigate = useNavigate();

  useTimer(() => setSeconds((seconds) => seconds - 1));

  useEffect(() => {
    async function leaveResetData() {
      if (seconds === 0) {
        try {
          await leaveGame(playerId, gameData.id);
          resetData();
          navigate(INACTIVE);
        } catch (error) {
          //to do: handle errors
        }
      }
    }
    leaveResetData();
  });

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
