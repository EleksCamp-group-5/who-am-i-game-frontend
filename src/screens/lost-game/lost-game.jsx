import GameTitle from '../../components/game-title/game-title';
import PlayerCard from '../../components/player-card/player-card';
import Btn from '../../components/btn/btn';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import './lost-game.scss';

function LostGame() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayerCard
        avatarClassName={sessionStorage.getItem('avatar')}
        name={sessionStorage.getItem('name')}
      />
      <h3 className="lost-game-screen-message">
        OOPS, YOU HAVE LOST THE GAME.TRY BETTER NEXT TIME. YOUR CHARACTER WAS{' '}
        <span className="lost-game-screen-message-character">
          {sessionStorage.getItem('character')}
        </span>
      </h3>
      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate('/');
        }}
      >
        GO TO MAIN MENU
      </Btn>
    </ScreenWrapper>
  );
}

export default LostGame;
