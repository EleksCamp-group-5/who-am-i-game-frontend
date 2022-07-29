import UsersContainer from '../../components/users-container/users-container';
import HistoryContainer from '../../components/history-container/history-container';
import GuessCharacterModal from '../../components/modals/guess-a-character';
import Header from '../../components/header/header';
import { useContext, useState, useCallback } from 'react';
import ModalContext from '../../contexts/modal-context';
import './play-page.scss';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import Spinner from '@atlaskit/spinner';
import { askGuess } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import useGameData from '../../hooks/useGameData';
import usePlayers from '../../hooks/usePlayers';
import { useNavigate } from 'react-router-dom';
import { inactivePlayer } from '../../services/games-service';
import {
  ANSWERING,
  ANSWER_GUESS,
  ASKING,
  GUESSING,
  INACTIVE,
} from '../../constants/constants';

function PlayPage() {
  const { gameData, playerId, resetData } = useContext(GameDataContext);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useGameData();
  const { currentPlayer, playersWithoutCurrent, playerTurn } = usePlayers();

  const makePlayerInactive = useCallback(async () => {
    try {
      const { data } = await inactivePlayer(playerId, gameData.id);

      if (data) {
        resetData();
        navigate(INACTIVE);
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw error;
      }
    }
  }, [playerId, gameData.id, resetData, navigate]);

  const onSubmitGuess = useCallback(
    async (guess) => {
      try {
        await askGuess(playerId, gameData.id, guess);
        setActive(false);
      } catch (error) {
        //to do: handle errors
      }
    },
    [gameData.id, playerId]
  );

  const onTimerFinish = useCallback(() => {
    if (
      (currentPlayer?.playerState === ASKING ||
        currentPlayer?.playerState === GUESSING) &&
      currentPlayer?.enteredQuestion &&
      playersWithoutCurrent.some((p) => !p.enteredAnswer)
    ) {
      return;
    }

    if (
      (currentPlayer?.playerState === ANSWERING ||
        currentPlayer?.playerState === ANSWER_GUESS) &&
      (currentPlayer?.enteredAnswer ||
        currentPlayer?.enteredQuestion ||
        !playerTurn?.enteredQuestion)
    ) {
      return;
    }

    makePlayerInactive();
  }, [
    currentPlayer?.enteredAnswer,
    currentPlayer?.enteredQuestion,
    currentPlayer?.playerState,
    playersWithoutCurrent,
    makePlayerInactive,
    playerTurn?.enteredQuestion,
  ]);

  return (
    <ScreenWrapper className="lobby-screen">
      {currentPlayer ? (
        <>
          <Header type="play-game" />
          <div className="lobby-screen__content_wrapper">
            <ModalContext.Provider value={[active, setActive]}>
              <UsersContainer
                currentPlayer={currentPlayer}
                players={playersWithoutCurrent}
                playerTurn={playerTurn}
                onTimerFinish={onTimerFinish}
              />
              <HistoryContainer
                currentPlayer={currentPlayer}
                players={playersWithoutCurrent}
                playerTurn={playerTurn}
              />
              <GuessCharacterModal
                active={active}
                onSubmit={onSubmitGuess}
                onCancel={() => setActive(false)}
                onTimerFinish={onTimerFinish}
              />
            </ModalContext.Provider>
          </div>
        </>
      ) : (
        <Spinner appearance="invert" />
      )}
    </ScreenWrapper>
  );
}

export default PlayPage;

/*
---------Modes-----------
ASLING - ask a question
ANSWERING - answer a question (3 buttons)
GUESSING - answer a quessing question (2 buttons)
WAITING - waiting for response from other prayers after giving an answer
RESPONSE - giving a response for the question ('yes' or 'no')
*/
