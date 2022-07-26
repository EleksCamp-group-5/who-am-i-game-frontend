import GameTitle from '../../components/game-title/game-title';
import PlayerCard from '../../components/player-card/player-card';
import Btn from '../../components/btn/btn';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import './inactivity-kick.scss';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';

function InactivityKick() {
  const { resetData } = useContext(GameDataContext);
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayerCard
        avatarClassName={sessionStorage.getItem('avatar')}
        name={sessionStorage.getItem('name')}
      />
      <h3 className="inactivity-kick-message">
        SORRY, YOU HAVE BEEN KICKED FROM THE GAME DUE TO INACTIVITY
      </h3>

      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          resetData();
          navigate('/');
        }}
      >
        GO TO MAIN MENU
      </Btn>
    </ScreenWrapper>
  );
}

export default InactivityKick;
