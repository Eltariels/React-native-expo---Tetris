// context/TetrisContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { saveGameScore } from '../app/api/games/saveGame'; // Vérifie bien le chemin du fichier
import { useSegments } from 'expo-router';
import { Board, Piece } from '@/types';
import {
  createEmptyBoard,
  generateRandomPiece,
  canPlacePiece,
  placePieceOnBoard,
  clearCompleteLines,
  computeGhostPiece,
  ROWS,
  COLS,
} from '@/logic/tetrisLogic';
import Rand from 'rand-seed';

/** Descripteur de succès */
interface Achievement {
  id: string;
  title: string;
  description: string;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'SCORE_1000', title: 'Score 1000', description: 'Atteindre 1000 points...' },
  { id: 'LINES_10', title: '10 lignes', description: 'Détruire 10 lignes...' },
  { id: 'PLAY_5_GAMES', title: '5 parties jouées', description: 'Jouer 5 parties...' },
];

interface TetrisContextValue {
  board: Board;
  activePiece: Piece | null;
  nextPiece: Piece | null;
  holdPiece: Piece | null;
  ghostPiece: Piece | null;
  score: number;
  lines: number;
  isPaused: boolean;
  hasHeld: boolean;
  gameOver: boolean; // <-- nouvel état

  bestScore: number;
  bestLines: number;
  gamesPlayed: number;
  totalPlayTime: number;

  achievementsUnlocked: Record<string, boolean>;

  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  togglePause: () => void;
  hold: () => void;
  restartGame: () => void;

  handleGameSeed: (value: number) => void;

  handleQuitGame: (gameMode: 'singleplayer' | 'multiplayer') => void;
  handleRetrieveGame: (gameMode: 'singleplayer' | 'multiplayer') => void;
}

const TetrisContext = createContext<TetrisContextValue | undefined>(undefined);

export function useTetris() {
  const ctx = useContext(TetrisContext);
  if (!ctx) {
    throw new Error('useTetris must be used within a TetrisProvider');
  }
  return ctx;
}

export function TetrisProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  // const isInTetris = segments[0] === 'tetris';
  const isInTetris = true;
  const [saveGameGameMode, setSaveGameGameMode] = useState<null | 'multiplayer' | 'singleplayer'>(null);
  const [gameSeed, setGameSeed] = useState<undefined | number>();
  const [randInstance, setRandInstance] = useState<Rand>(() => new Rand());
  const [gameStarted, setGameStarted] = useState(false);
  // États principaux
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [activePiece, setActivePiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [holdPiece, setHoldPiece] = useState<Piece | null>(null);
  const [ghostPiece, setGhostPiece] = useState<Piece | null>(activePiece);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasHeld, setHasHeld] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [bestScore, setBestScore] = useState(0);
  const [bestLines, setBestLines] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  const [playStartTime, setPlayStartTime] = useState<number | null>(null);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<Record<string, boolean>>({});

  // Chrono
  function updatePlayTime() {
    if (playStartTime != null) {
      const now = Date.now();
      const diffSec = Math.floor((now - playStartTime) / 1000);
      setTotalPlayTime((prev) => prev + diffSec);
      setPlayStartTime(null);
    }
  }
  function resumePlayTime() {
    setPlayStartTime(Date.now());
  }

  // Succès
  const checkAchievements = useCallback(
    (currentScore: number, currentLines: number, currentGames: number) => {
      const currentUnlocked = { ...achievementsUnlocked };
      if (currentScore >= 1000 && !currentUnlocked['SCORE_1000']) {
        currentUnlocked['SCORE_1000'] = true;
      }
      if (currentLines >= 10 && !currentUnlocked['LINES_10']) {
        currentUnlocked['LINES_10'] = true;
      }
      if (currentGames >= 5 && !currentUnlocked['PLAY_5_GAMES']) {
        currentUnlocked['PLAY_5_GAMES'] = true;
      }
      setAchievementsUnlocked(currentUnlocked);
    },
    [achievementsUnlocked]
  );

  const handleGameStart = useCallback(() => {
    if (gameStarted) return;
    setGameStarted(true);
  }, [gameStarted]);

  // restartGame
  const restartGame = useCallback(() => {
    setGamesPlayed((prev) => prev + 1);
    updatePlayTime(); // arrêter le chrono
    setBestScore((prev) => (score > prev ? score : prev));
    setBestLines((prev) => (lines > prev ? lines : prev));

    // Réinitialisation
    setBoard(createEmptyBoard());
    const pieceA = generateRandomPiece(randInstance);
    const pieceN = generateRandomPiece(randInstance);
    pieceA.col = Math.floor(COLS / 2) - 1;
    setActivePiece(pieceA);
    setNextPiece(pieceN);
    setHoldPiece(null);
    setScore(0);
    setLines(0);
    setIsPaused(false);
    setHasHeld(false);
    setGameOver(false);
    setPlayStartTime(Date.now());

    checkAchievements(score, lines, gamesPlayed + 1);
  }, [score, lines, gamesPlayed, checkAchievements]);

  const reloadAllGame = useCallback(() => {
    updatePlayTime(); // arrêter le chrono
    // Réinitialisation
    setBoard(createEmptyBoard());
    const pieceA = generateRandomPiece(randInstance);
    const pieceN = generateRandomPiece(randInstance);
    pieceA.col = Math.floor(COLS / 2) - 1;
    setActivePiece(pieceA);
    setNextPiece(pieceN);
    setHoldPiece(null);
    setScore(0);
    setLines(0);
    setIsPaused(false);
    setHasHeld(false);
    setGameOver(false);
    setGameStarted(false);
    setPlayStartTime(Date.now());
  }, [score, lines, gamesPlayed, randInstance]);

  const handleGameSeed = (seed: number) => {
    setGameSeed(seed);
    setRandInstance(() => new Rand(seed.toString()));
  };

  useEffect(() => {
    if (gameSeed) {
      setRandInstance(() => new Rand(gameSeed.toString()));
    }
  }, [gameSeed]);

  useEffect(() => {
    reloadAllGame();
  }, [randInstance]);

  const handleGameOver = async () => {
    try {
      await saveGameScore(score, lines, totalPlayTime);
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du score:', error);
    }
  };

  // softDrop
  const softDrop = useCallback(() => {
    if (activePiece && nextPiece) {
      handleGameStart();
      const testPiece = { ...activePiece, row: activePiece.row + 1 };
      if (canPlacePiece(board, testPiece)) {
        setActivePiece(testPiece);
      } else {
        const placed = placePieceOnBoard(board, activePiece);
        const { newBoard, linesCleared } = clearCompleteLines(placed);
        setBoard(newBoard);

        setLines((prevLines) => {
          const newLines = prevLines + linesCleared;
          checkAchievements(score, newLines, gamesPlayed);
          return newLines;
        });
        setScore((prevScore) => {
          const newScore = prevScore + linesCleared * 100;
          checkAchievements(newScore, lines + linesCleared, gamesPlayed);
          return newScore;
        });

        const freshActive = { ...nextPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
        setHasHeld(false);

        if (!canPlacePiece(newBoard, freshActive)) {
          if (!gameOver) {
            // Vérifie que le jeu n'est pas déjà en Game Over
            setBestScore((prev) => (score > prev ? score : prev));
            setBestLines((prev) => {
              const newTotal = lines + linesCleared;
              return newTotal > prev ? newTotal : prev;
            });
            updatePlayTime();
            setGameOver(true);
            handleGameOver();
          }
        } else {
          const freshNext = generateRandomPiece(randInstance);
          setActivePiece(freshActive);
          setNextPiece(freshNext);
        }
      }
    }
  }, [board, activePiece, nextPiece, score, lines, gamesPlayed, checkAchievements, randInstance]);

  // Ghost piece
  const updateGhostPiece = useCallback(() => {
    if (activePiece) {
      const ghost = computeGhostPiece(board, activePiece);
      setGhostPiece(ghost);
    }
  }, [board, activePiece]);

  useEffect(() => {
    updateGhostPiece();
  }, [board, activePiece, updateGhostPiece]);

  // Descente auto si dans /tetris et pas en pause
  useEffect(() => {
    if (!isInTetris || isPaused || !gameStarted) return;
    const intervalId = setInterval(() => {
      softDrop();
    }, 500);
    return () => clearInterval(intervalId);
  }, [softDrop, isPaused, isInTetris]);

  // hardDrop
  const hardDrop = useCallback(() => {
    if (!isInTetris || isPaused || !ghostPiece || !nextPiece) return;
    handleGameStart();
    const placed = placePieceOnBoard(board, ghostPiece);
    const { newBoard, linesCleared } = clearCompleteLines(placed);
    setBoard(newBoard);

    setLines((prev) => {
      const newLines = prev + linesCleared;
      checkAchievements(score, newLines, gamesPlayed);
      return newLines;
    });
    setScore((prev) => {
      const newScore = prev + linesCleared * 100;
      checkAchievements(newScore, lines + linesCleared, gamesPlayed);
      return newScore;
    });

    const freshActive = { ...nextPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
    const freshNext = generateRandomPiece(randInstance);
    setHasHeld(false);

    if (!canPlacePiece(newBoard, freshActive)) {
      if (!gameOver) {
        // Vérifie que le jeu n'est pas déjà en Game Over
        setBestScore((prev) => (score > prev ? score : prev));
        setBestLines((prev) => {
          const newTotal = lines + linesCleared;
          return newTotal > prev ? newTotal : prev;
        });
        updatePlayTime();
        setGameOver(true);
        handleGameOver();
      }
    } else {
      setActivePiece(freshActive);
      setNextPiece(freshNext);
    }
  }, [board, ghostPiece, nextPiece, isInTetris, isPaused, score, lines, gamesPlayed, checkAchievements, randInstance]);

  // moveLeft, moveRight, rotate, hold
  const moveLeft = useCallback(() => {
    if (!isInTetris || isPaused || !activePiece || !nextPiece) return;
    handleGameStart();
    const test = { ...activePiece, col: activePiece.col - 1 };
    if (canPlacePiece(board, test)) {
      setActivePiece(test);
    }
  }, [isInTetris, isPaused, activePiece, board]);

  const moveRight = useCallback(() => {
    if (!isInTetris || isPaused || !activePiece || !nextPiece) return;
    handleGameStart();
    const test = { ...activePiece, col: activePiece.col + 1 };
    if (canPlacePiece(board, test)) {
      setActivePiece(test);
    }
  }, [isInTetris, isPaused, activePiece, board]);

  const rotate = useCallback(() => {
    if (!isInTetris || isPaused || !activePiece || !nextPiece) return;
    handleGameStart();
    const rotated = activePiece.shape[0].map((_, i) => activePiece.shape.map((row) => row[i]).reverse());
    const testPiece = { ...activePiece, shape: rotated };
    if (canPlacePiece(board, testPiece)) {
      setActivePiece(testPiece);
    }
  }, [board, activePiece, isInTetris, isPaused]);

  const hold = useCallback(() => {
    if (!isInTetris || isPaused || !activePiece || !nextPiece) return;
    handleGameStart();
    if (hasHeld) return;
    if (holdPiece) {
      const temp = { ...holdPiece, row: activePiece.row, col: activePiece.col };
      setHoldPiece({ ...activePiece, row: 0, col: Math.floor(COLS / 2) - 1 });
      setActivePiece(temp);
    } else {
      setHoldPiece({ ...activePiece, row: 0, col: Math.floor(COLS / 2) - 1 });
      const freshActive = { ...nextPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
      const freshNext = generateRandomPiece(randInstance);
      setActivePiece(freshActive);
      setNextPiece(freshNext);
    }
    setHasHeld(true);
  }, [isInTetris, isPaused, hasHeld, holdPiece, activePiece, nextPiece, randInstance]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (!prev) {
        updatePlayTime();
      } else {
        resumePlayTime();
      }
      return !prev;
    });
  }, []);

  const handleQuitGame = useCallback(
    (gameMode: 'singleplayer' | 'multiplayer') => {
      togglePause();
      setSaveGameGameMode(gameMode);
    },
    [togglePause]
  );

  const handleRetrieveGame = useCallback(
    (gameMode: 'singleplayer' | 'multiplayer') => {
      if (saveGameGameMode) {
        if (saveGameGameMode !== gameMode) {
          reloadAllGame();
        }
      }
    },
    [saveGameGameMode]
  );

  // Chrono route-based
  useEffect(() => {
    if (!isInTetris) {
      updatePlayTime();
      return;
    }
    if (playStartTime == null) {
      setPlayStartTime(Date.now());
    }
    return () => {
      updatePlayTime();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInTetris]);

  const value: TetrisContextValue = {
    board,
    activePiece,
    nextPiece,
    holdPiece,
    ghostPiece,
    score,
    lines,
    isPaused,
    hasHeld,
    gameOver,
    bestScore,
    bestLines,
    gamesPlayed,
    totalPlayTime,
    achievementsUnlocked,

    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    hold,
    restartGame,
    handleGameSeed,

    handleQuitGame,
    handleRetrieveGame,
  };

  return <TetrisContext.Provider value={value}>{children}</TetrisContext.Provider>;
}
