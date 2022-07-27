import GameTitle from '../../components/game-title/game-title';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useContext, useEffect } from 'react';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import useAuth from '../../hooks/useAuth';

function Homepage() {
  const { leaveGame } = useContext(GameDataContext);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    leaveGame();
  }, [leaveGame]);

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayersOnlineTitle />
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </ScreenWrapper>
  );
}

export default Homepage;
