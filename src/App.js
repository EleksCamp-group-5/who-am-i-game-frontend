import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './screens/home/home';
import Loading from './screens/loading/loading';
import PlayPage from './screens/play-page/play-page';
import LostGame from './screens/lost-game/lost-game';
import Victory from './screens/victory-screen/victory-screen';
import InactivityKick from './screens/inactiviy-kick/inactivity-kick';
import Lobby from './screens/lobby/lobby';
import { AuthProvider } from './contexts/auth-provider-comtext';
import GameDataContext from './contexts/game-data-context';
import MainLobby from './screens/main-lobby/main-lobby';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import {
  DEFEAT,
  GAME_LOBBY,
  INACTIVE,
  LOADING,
  LOBBY,
  MAIN_LOBBY,
  PLAY,
  VICTORY,
  CREATE_ACCOUNT,
  SIGN_IN,
  RESTORE,
  NEW_PASSWORD,
  PROFILE,
  REDIRECT,
} from './constants/constants';
import CreateAccount from './screens/create-account/create-account';
import SignIn from './screens/signin-page/signin-page';
import RestorePassword from './screens/restore-password/restore-password';
import NewPassword from './screens/new-password/new-password';
import GameLobby from './screens/game-lobby/game-lobby';
import ProfilePage from './screens/profile-page/profile-page';
import {
  findGameById,
  leaveGame as submitLeaveGame,
} from './services/games-service';
import { useNavigate } from 'react-router-dom';
import keyBy from 'lodash/keyBy';
import EmailRedirect from './screens/email-redirect/email-redirect';

const initialData = { status: null, players: [], winners: [], playersById: {} };

function App() {
  const [gameData, setGameData] = useState(initialData);
  const [playerId, setPlayerId] = useState(sessionStorage.playerId || uuidv4());
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('playerId', playerId);
  }, [playerId]);

  const resetData = useCallback(() => {
    setGameData(initialData);
    sessionStorage.removeItem('gameId');
    sessionStorage.removeItem('playerId');
    setPlayerId(uuidv4());
  }, []);

  const fetchGame = useCallback(async () => {
    const gameId = gameData.id || sessionStorage.getItem('gameId');
    const userId = playerId || sessionStorage.getItem('playerId');

    if (gameId && userId) {
      try {
        const { data } = await findGameById(userId, gameId);

        if (data.players.length) {
          const players = data.players.map((player, index) => ({
            ...player,
            avatar: `avatar0${index + 1}`,
          }));
          const playersById = keyBy(players, 'id');
          setGameData((oldData) => ({
            ...data,
            players,
            playersById: { ...oldData.playersById, ...playersById },
          }));
        }
      } catch (error) {
        if (error.response.status === 404) {
          resetData();
          navigate('/');
        }

        if (error.code === 'ERR_NETWORK') {
          throw error;
        }
      }
    }
  }, [gameData.id, navigate, playerId, resetData]);

  const leaveGame = useCallback(async () => {
    if (!gameData.id) {
      return;
    }
    try {
      await submitLeaveGame(playerId, gameData.id);
      resetData();
    } catch (error) {
      //to do: handle errors
    }
  }, [gameData.id, playerId, resetData]);

  return (
    <div className="App">
      <AuthProvider>
        <GameDataContext.Provider
          value={{
            gameData,
            setGameData,
            playerId,
            setPlayerId,
            resetData,
            fetchGame,
            leaveGame,
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path={MAIN_LOBBY} element={<MainLobby />} />
            <Route path={GAME_LOBBY} element={<GameLobby />} />
            <Route path={LOADING} element={<Loading />} />
            <Route path={LOBBY} element={<Lobby />} />
            <Route path={PLAY} element={<PlayPage />} />
            <Route path={DEFEAT} element={<LostGame />} />
            <Route path={VICTORY} element={<Victory />} />
            <Route path={INACTIVE} element={<InactivityKick />} />
            <Route path={CREATE_ACCOUNT} element={<CreateAccount />} />
            <Route path={SIGN_IN} element={<SignIn />} />
            <Route path={RESTORE} element={<RestorePassword />} />
            <Route path={NEW_PASSWORD} element={<NewPassword />} />
            <Route path={REDIRECT} element={<EmailRedirect />} />
            <Route path={PROFILE} element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GameDataContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
