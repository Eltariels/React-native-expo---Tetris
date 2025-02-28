// logic/tetrisLogic.ts
import { Board, Piece } from '@/types';
import Rand from 'rand-seed';

// Dimensions par défaut
export const ROWS = 20;
export const COLS = 10;

// Différentes formes de pièces
const TETRIS_PIECES: { [key: string]: number[][] } = {
  I: [[1], [1], [1], [1]],
  O: [
    [2, 2],
    [2, 2],
  ],
  T: [
    [0, 3, 0],
    [3, 3, 3],
  ],
  L: [
    [4, 0, 0],
    [4, 0, 0],
    [4, 4, 0],
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
  ],
  Z: [
    [6, 6, 0],
    [0, 6, 6],
  ],
  J: [
    [7, 7, 7],
    [0, 0, 7],
  ],
};

/** Crée une grille vide. */
export function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

/** Génère une pièce aléatoire. */
export function generateRandomPiece(rand: Rand): Piece {
  const keys = Object.keys(TETRIS_PIECES);
  const ran = Math.floor(rand.next() * keys.length);
  const randomKey = keys[ran];
  return {
    shape: TETRIS_PIECES[randomKey],
    row: 0,
    col: Math.floor(COLS / 2) - 1,
  };
}

/** Vérifie si on peut placer la pièce dans la grille sans collision. */
export function canPlacePiece(board: Board, piece: Piece): boolean {
  const { shape, row, col } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

/** Place la pièce sur la grille (retourne une copie). */
export function placePieceOnBoard(board: Board, piece: Piece): Board {
  const newBoard = board.map((row) => [...row]);
  const { shape, row, col } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        newBoard[row + r][col + c] = shape[r][c];
      }
    }
  }
  return newBoard;
}

/** Efface les lignes complètes et renvoie la grille nettoyée + le nb de lignes. */
export function clearCompleteLines(board: Board): { newBoard: Board; linesCleared: number } {
  let linesCleared = 0;
  const filtered = board.filter((row) => {
    const isFull = row.every((cell) => cell !== 0);
    if (isFull) {
      linesCleared++;
      return false;
    }
    return true;
  });
  // On ajoute des lignes vides en haut
  while (filtered.length < ROWS) {
    filtered.unshift(Array(COLS).fill(0));
  }
  return { newBoard: filtered, linesCleared };
}

/** Calcule la position "fantôme" de la pièce si on la laisse tomber. */
export function computeGhostPiece(board: Board, piece: Piece): Piece {
  let ghost = { ...piece };
  // On descend la pièce tant qu'elle peut se placer
  while (true) {
    const test = { ...ghost, row: ghost.row + 1 };
    if (canPlacePiece(board, test)) {
      ghost = test;
    } else {
      break;
    }
  }
  return ghost;
}
