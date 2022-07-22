import GameTitle from '../../components/game-title/game-title';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useContext, useEffect, useState } from 'react';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';

function Homepage() {
  const { leaveGame } = useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    leaveGame();
  }, [leaveGame]);

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayersOnlineTitle />
      {isLogin ? (
        <AfterLogin setIsLogin={setIsLogin} />
      ) : (
        <BeforeLogin setIsLogin={setIsLogin} />
      )}
    </ScreenWrapper>
  );
}

export default Homepage;
