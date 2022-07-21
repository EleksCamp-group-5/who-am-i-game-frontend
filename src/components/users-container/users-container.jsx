import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import PlayerCard from '../player-card/player-card';
import ModalContext from '../../contexts/modal-context';
import './users-container.scss';
import { useContext, useState } from 'react';
import { useEffect } from 'react';

function UsersContainer({ currentPlayer, players, playerTurn, onTimerFinish }) {
  const modalActive = useContext(ModalContext)[0];
  const mode = playerTurn.playerState;
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (playerTurn.enteredQuestion) {
      setTime(20);

      return;
    }

    if (!playerTurn.enteredQuestion || players.every((p) => p.enteredAnswer)) {
      setTime(60);

      return;
    }

    setTime(60);
  }, [currentPlayer.enteredAnswer, mode, playerTurn.enteredQuestion, players]);

  return (
    <div className="users">
      <div className="users__timer-container">
        <p className="users__turn">TURN TIME</p>
        <CountdownTimer
          small={'v-small'}
          time={time}
          paused={modalActive}
          onFinish={onTimerFinish}
        />
      </div>
      {currentPlayer && (
        <PlayerCard
          className="in-users-container"
          avatarClassName={currentPlayer.avatar}
          name={currentPlayer.name}
          assignedCharacter="This is you"
          active={currentPlayer.id === playerTurn?.id}
          playerStatusClassName={currentPlayer.character ? 'yes' : null}
        />
      )}
      <hr />
      <div className="users__list">
        {players
          ? players.map((player, index) => (
              <PlayerCard
                className="in-users-container"
                key={player.id}
                name={player.name}
                avatarClassName={player.avatar}
                assignedCharacter={player.character}
                active={player.id === playerTurn?.id}
                playerStatusClassName={currentPlayer.character ? 'yes' : null}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default UsersContainer;
