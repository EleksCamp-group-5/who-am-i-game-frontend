import { useState, useContext, useRef, useCallback } from 'react';
import Spinner from '@atlaskit/spinner';
import { getAllPlayersCount } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import './players-online-title.scss';
import useInterval from '../../hooks/useInterval';
import { promiseStatus, PromiseStatuses } from 'promise-status-async';

function PlayersOnlineTitle() {
  const { playerId } = useContext(GameDataContext);
  const [playerNum, setPlayerNum] = useState();
  const promiseRef = useRef();

  const fetchCount = useCallback(async () => {
    const { data } = await getAllPlayersCount(playerId);
    setPlayerNum(data);
  }, [playerId]);

  const tickHandler = useCallback(async () => {
    const status = await promiseStatus(promiseRef.current);

    if (
      status === PromiseStatuses.PROMISE_PENDING ||
      status === PromiseStatuses.PROMISE_REJECTED
    ) {
      return;
    }

    promiseRef.current = fetchCount();
  }, [fetchCount]);

  useInterval(tickHandler, 1000);

  return (
    <span className="players-online">
      {playerNum ?? <Spinner appearance="invert" />}{' '}
      {playerNum > 1 ? 'Players' : 'Player'} Online
    </span>
  );
}

export default PlayersOnlineTitle;
