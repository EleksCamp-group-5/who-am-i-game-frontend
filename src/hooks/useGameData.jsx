import { useRef } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LOADING,
  LOBBY,
  PLAY,
  PROCESSING_QUESTION,
  SUGGESTING_CHARACTERS,
  WAITING_FOR_PLAYERS,
  VICTORY,
  DEFEAT,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function useGameData() {
  const { gameData, resetData, playerId, fetchGame } =
    useContext(GameDataContext);
  const navigate = useNavigate();
  const promiseRef = useRef();

  useEffect(() => {
    if (promiseRef.current && promiseRef.current.state === 'pending') {
      return;
    }

    const checkStatus = setTimeout(function () {
      promiseRef.current = fetchGame();
    }, 2000);

    return () => clearTimeout(checkStatus);
  });

  useEffect(() => {
    if (!gameData.id && !sessionStorage.gameId) {
      resetData();
      navigate('/');

      return;
    }

    if (gameData.winners.length) {
      const [winner] = gameData.winners;

      if (winner.id === playerId) {
        navigate(VICTORY);
      } else {
        navigate(DEFEAT);
      }

      return;
    }

    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);

      return;
    }

    if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);

      return;
    }

    if (gameData.status === PROCESSING_QUESTION) {
      navigate(PLAY);

      return;
    }
  }, [gameData, resetData, playerId, navigate]);

  return;
}
