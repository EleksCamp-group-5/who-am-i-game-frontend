import GameTitle from '../../components/game-title/game-title';
import Btn from '../../components/btn/btn';
import Timer from '../../components/timer/timer';
import LeaveGameModal from '../../components/modals/leave-game';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useState, useContext, useMemo } from 'react';
import GameDataContext from '../../contexts/game-data-context';
import './loading.scss';
import useGameData from '../../hooks/useGameData';

function Loading() {
  const { gameData } = useContext(GameDataContext);
  const [leaveModalActive, setLeaveModalActive] = useState(false);

  useGameData();

  const timer = useMemo(() => <Timer />, []);

  return (
    <ScreenWrapper>
      <GameTitle />
      <h3 className="loading__queue-number">
        {gameData.players && gameData.players.length} PLAYERS ARE IN QUEUE
      </h3>
      <h3 className="loading__waiting-message">
        PLEASE WAIT UNTIL WE FIND YOUR OPPONENTS
      </h3>
      {timer}
      <div className="loading__button-wrappper">
        <Btn
          className={['btn-pink-solid']}
          onClick={() => setLeaveModalActive(true)}
        >
          LEAVE GAME
        </Btn>
      </div>
      <LeaveGameModal
        active={leaveModalActive}
        onCancel={() => setLeaveModalActive(false)}
      />
    </ScreenWrapper>
  );
}

export default Loading;
