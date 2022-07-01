import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './screens/home/home';
import Loading from './screens/loading/loading';
import PlayPage from './screens/play-page/play-page';
import LostGame from './screens/lost-game/lost-game';
import Victory from './screens/victory-screen/victroy-screen';
import InactivityKick from './screens/inactiviy-kick/inactivity-kick';
import Lobby from './screens/lobby/lobby';
import GameDataContext from './contexts/game-data-context';
import MainLobby from './screens/main-lobby/main-lobby';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import './App.scss';
import {
  DEFEAT,
  INACTIVE,
  LOADING,
  LOBBY,
  MAIN_LOBBY,
  PLAY,
  VICTORY,
  CREATE_ACCOUNT,
  SIGN_IN,
  RESTORE,
  CONFIRM,
  NEW_PASSWORD,
} from './constants/constants';
import CreateAccount from './screens/create-account/create-account';
import SignIn from './screens/signin-page/signin-page';
import RestorePassword from './screens/restore-password/restore-password';
import ConfirmPassword from './screens/confirm-password/confirm-password';
import NewPassword from './screens/new-password/new-password';

function App() {
  const [gameData, setGameData] = useState({
    data: {
      status: null,
    },
  });
  const [playerId] = useState(uuidv4());

  function resetData() {
    setGameData({
      data: {
        status: null,
      },
    });
  }

  return (
    <div className="App">
      <GameDataContext.Provider
        value={{ gameData, setGameData, playerId, resetData }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={MAIN_LOBBY} element={<MainLobby />} />
          <Route path={LOADING} element={<Loading />} />
          <Route path={LOBBY} element={<Lobby />} />
          <Route path={PLAY} element={<PlayPage />} />
          <Route path={DEFEAT} element={<LostGame />} />
          <Route path={VICTORY} element={<Victory />} />
          <Route path={INACTIVE} element={<InactivityKick />} />
          <Route path={CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={SIGN_IN} element={<SignIn />} />
          <Route path={RESTORE} element={<RestorePassword />} />
          <Route path={CONFIRM} element={<ConfirmPassword />} />
          <Route path={NEW_PASSWORD} element={<NewPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </GameDataContext.Provider>
    </div>
  );
}

export default App;
