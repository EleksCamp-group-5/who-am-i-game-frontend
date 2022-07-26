import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useContext,
} from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import {
  answerQuestion,
  askQuestion,
  getHistory,
  answerGuess,
} from '../../services/games-service';
import {
  ANSWERING,
  ANSWER_GUESS,
  ASKING,
  GUESSING,
  NO,
  RESPONSE,
  WAITING,
} from '../../constants/constants';
import GameDataContext from '../../contexts/game-data-context';
import debounce from 'lodash/debounce';

function HistoryContainer({ currentPlayer, players, playerTurn }) {
  const { gameData, playerId, fetchGame } = useContext(GameDataContext);
  const bottomElement = useRef(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const mode = currentPlayer.playerState;
  const playersByIds = gameData.playersById;

  const allPlayers = useMemo(
    () => Object.values(gameData.playersById),
    [gameData.playersById]
  );

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [history.length]);

  const fetchHistory = useMemo(
    () =>
      debounce(async function () {
        if (!gameData.id) {
          return;
        }
        const { data } = await getHistory(gameData.id);
        setHistory(data.questions);
      }, 200),
    [gameData.id]
  );

  useEffect(() => {
    fetchHistory();
  }, [
    playerTurn?.id,
    fetchHistory,
    playerTurn?.playerQuestion,
    currentPlayer.playerAnswer,
  ]);

  const lastHistoryItemAnswersLength = useMemo(
    () => history[history.length - 1]?.answers.length ?? 0,
    [history]
  );
  const answersLength = useMemo(
    () =>
      players.reduce((all, player) => {
        if (player.enteredAnswer) {
          return all + 1;
        }

        return all;
      }, 0),
    [players]
  );

  useEffect(() => {
    if (lastHistoryItemAnswersLength !== answersLength) {
      fetchHistory();
    }
  }, [lastHistoryItemAnswersLength, answersLength, fetchHistory]);

  const submitAsk = useCallback(
    async (question) => {
      setLoading(true);
      try {
        await askQuestion(playerId, gameData.id, question);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswer = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerQuestion(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswerGuess = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerGuess(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  return (
    <div className="history">
      <div className="history_list">
        {history.map((item, index) => {
          if (!playersByIds[item.player]) {
            return null;
          }
          const last = history.length - 1 === index;

          return (
            <HistoryItem
              question={item}
              key={index}
              user={playersByIds[item.player]}
              users={last ? gameData.players : allPlayers}
              last={last}
            />
          );
        })}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      <div className="history_bottom">
        {mode === ASKING &&
          (!playerTurn.enteredQuestion ||
            players.every((p) => p.enteredAnswer)) && (
            <QuestionForm onSubmit={submitAsk} disabled={loading} />
          )}
        {(mode === ANSWERING || mode === ANSWER_GUESS) &&
          !currentPlayer.enteredAnswer &&
          !currentPlayer.enteredQuestion &&
          playerTurn.enteredQuestion && (
            <AnswerForm
              mode={playerTurn.playerState === GUESSING ? GUESSING : mode}
              onSubmit={
                playerTurn.playerState === GUESSING
                  ? submitAnswerGuess
                  : submitAnswer
              }
              disabled={loading}
            />
          )}
        {(mode === ANSWERING || mode === ANSWER_GUESS) &&
          currentPlayer.enteredAnswer &&
          !currentPlayer.enteredQuestion && (
            <MessageBlock mode={WAITING} message={currentPlayer.playerAnswer} />
          )}
        {(mode === ANSWERING || mode === ANSWER_GUESS) &&
          currentPlayer.enteredQuestion && (
            <MessageBlock mode={RESPONSE} message={NO} />
          )}
      </div>
    </div>
  );
}

export default HistoryContainer;
