import { useContext } from 'react';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const players = gameData.players.map((player, index) => ({
    nickname: player.nickname || `Player ${index + 1}`,
    avatar: `avatar0${index + 1}`,
    ...player,
  }));

  const currentPlayer = players.find((player) => player.id === playerId);
  const playersWithoutCurrent = players.filter(
    (player) => player.id !== playerId
  );

  return { currentPlayer, playersWithoutCurrent };
}
