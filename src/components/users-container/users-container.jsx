import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import PlayerCard from '../player-card/player-card';
import ModalContext from '../../contexts/modal-context';
import './users-container.scss';
import { useContext } from 'react';

function UsersContainer({ mode, currentPlayer, players }) {
  const modalActive = useContext(ModalContext)[0];

  return (
    <div className="users">
      <div className="users__timer-container">
        <p className="users__turn">TURN TIME</p>
        <CountdownTimer
          small={'v-small'}
          time={mode === 'guess' || mode === 'answer' ? 20 : 60}
          paused={modalActive}
        />
      </div>
      {currentPlayer && (
        <PlayerCard
          className="in-users-container"
          avatarClassName={currentPlayer.avatar}
          name={currentPlayer.name}
          isYou
        />
      )}
      <hr />
      <div className="users__list">
        {players ? (
          players.map((player) => (
            <PlayerCard
              className="in-users-container"
              key={player.id}
              name={player.name}
              avatarClassName={player.avatar}
              assignedCharacter={player.character}
            />
          ))
        ) : (
          <h1>Something went wrong</h1>
        )}
      </div>
    </div>
  );
}

export default UsersContainer;
