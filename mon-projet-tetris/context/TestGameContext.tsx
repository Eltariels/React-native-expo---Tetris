import { TetrisGame } from '@/classes/TetrisGame';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useReducer,
  Dispatch,
  SetStateAction,
} from 'react';

type TetrisGameProviderType = {
  game: TetrisGame;
  setGame: Dispatch<SetStateAction<TetrisGame>>;
  refreshGame: () => void;
};
const GameContext = createContext<TetrisGameProviderType | null>(null);

export function TetrisGameProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const refreshGame = useCallback(() => {
    forceUpdate();
  }, []);

  const [game, setGame] = useState<TetrisGame>(() => new TetrisGame(false, null, null, refreshGame));

  return <GameContext.Provider value={{ game, setGame, refreshGame }}>{children}</GameContext.Provider>;
}

export function useTetrisGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
