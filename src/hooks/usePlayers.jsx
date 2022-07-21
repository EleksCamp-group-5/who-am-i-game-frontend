import { useContext } from 'react';
import { ASKING, GUESSING } from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  return gameData.players.reduce(
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
}
