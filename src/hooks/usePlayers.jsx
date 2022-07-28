import { useEffect } from 'react';
import { useContext } from 'react';
import { ASKING, GUESSING } from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const playersData = gameData.players.reduce(
    (obj, player) => {
      if (player.playerState === ASKING || player.playerState === GUESSING) {
        obj.playerTurn = player;
      }

      if (player.id === playerId) {
        obj.currentPlayer = player;

        return obj;
      }

      obj.playersWithoutCurrent.push(player);

      return obj;
    },
    { byIds: gameData.playersById, playersWithoutCurrent: [] }
  );

  const { currentPlayer } = playersData;
  useEffect(() => {
    if (currentPlayer) {
      sessionStorage.setItem('avatar', currentPlayer.avatar);
      sessionStorage.setItem('name', currentPlayer.nickname);
      sessionStorage.setItem('character', currentPlayer.character);
    }
  }, [currentPlayer]);

  return playersData;
}
