import GameTitle from '../../components/game-title/game-title';
import PlayerCard from '../../components/player-card/player-card';
import Btn from '../../components/btn/btn';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import './victory-screen.scss';

function Victory() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayerCard
        avatarClassName={sessionStorage.getItem('avatar')}
        name={sessionStorage.getItem('name')}
      />
      <h3 className="victory-screen-message">
        CONGRATULATIONS. YOU HAVE WON THE GAME
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

export default Victory;
