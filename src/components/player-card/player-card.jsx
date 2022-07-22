import clsx from 'clsx';
import './player-card.scss';

// <-- Use these names for Avatar icons -->
// 'avatar01'
// 'avatar02'
// 'avatar03'
// 'avatar04'

// <-- Use these names for Player Satus -->
// 'unsure'
// 'yes'
// 'no'

// if you won't assign description and player status it will be hidden

function PlayerCard({
  className,
  avatarClassName,
  name,
  playerStatusClassName,
  assignedCharacter,
  isYou,
  lobbyOwner,
  active,
}) {
  return (
    <div className="player">
      <div className={clsx('player__card', className)}>
        <div
          className={clsx('player__card-avatar', avatarClassName, {
            'player__card-avatar_active': active,
          })}
        ></div>
        <div className="player__card-name">{name}</div>
        {isYou && <div className="player__you-label">THIS IS YOU</div>}
        {lobbyOwner && <div className="player__you-label">LOBBY OWNER</div>}
        {assignedCharacter && (
          <div
            className={clsx('player__assigned-character ', {
              'player__assigned-character_active': active,
            })}
          >
            {assignedCharacter}
          </div>
        )}
      </div>
      <div className={clsx('player__status', playerStatusClassName)}></div>
    </div>
  );
}

export default PlayerCard;
