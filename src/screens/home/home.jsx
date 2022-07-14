import GameTitle from '../../components/game-title/game-title';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NUMBER_OF_PLAYERS, LOADING } from '../../constants/constants';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import { createGame, leaveGame } from '../../services/games-service';

function Homepage() {
  const { resetData, playerId } = useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function leaveResetData() {
      const gameId = sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          await leaveGame(userId, gameId);
          resetData();
        } catch (error) {
          //to do: handle errors
        }
      }
    }

    leaveResetData();
  }, []);

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
