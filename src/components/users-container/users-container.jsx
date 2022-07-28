import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import PlayerCard from '../player-card/player-card';
import ModalContext from '../../contexts/modal-context';
import './users-container.scss';
import { useContext, useMemo } from 'react';

function UsersContainer({ currentPlayer, players, playerTurn, onTimerFinish }) {
  const modalActive = useContext(ModalContext)[0];

  const isAnswering = useMemo(
    () =>
      playerTurn?.enteredQuestion &&
      !currentPlayer?.enteredAnswer &&
      players.some((p) => !p.enteredAnswer),
    [currentPlayer?.enteredAnswer, playerTurn?.enteredQuestion, players]
  );

  return (
    <div className="users">
      <div className="users__timer-container">
        <p className="users__turn">TURN TIME</p>
        <CountdownTimer
          small={'v-small'}
          time={isAnswering ? 20 : 60}
          paused={modalActive}
          onFinish={onTimerFinish}
          reset={playerTurn?.enteredQuestion}
        />
      </div>
      {currentPlayer && (
        <PlayerCard
          className="in-users-container"
          avatarClassName={currentPlayer.avatar}
          name={currentPlayer.nickname}
          assignedCharacter="This is you"
          active={currentPlayer.id === playerTurn?.id}
        />
      )}
      <hr />
      <div className="users__list">
        {players
          ? players.map((player, index) => (
              <PlayerCard
                className="in-users-container"
                key={player.id}
                name={player.nickname}
                avatarClassName={player.avatar}
                assignedCharacter={player.character}
                active={player.id === playerTurn?.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default UsersContainer;
