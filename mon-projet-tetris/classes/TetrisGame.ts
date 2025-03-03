import Rand from 'rand-seed';
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
import { Board, Piece } from '@/types';
import { saveGameScore } from '@/app/api/games/saveGame';

export class TetrisGame {
  private gameStarted: boolean;
  private refreshCallback?: () => void;
  private rand: Rand;
  private seed: number | null;
  private duelId: string | null;
  private board: Board;
  private activePiece: Piece;
  private nextPiece: Piece;
  private holdPiece: Piece | null;
  private ghostPiece: Piece;
  private score: number;
  private lines: number;
  private isPaused: boolean;
  private hasHeld: boolean;
  private gameOver: boolean;
  private isMultiplayer: boolean;
  private dropInterval: NodeJS.Timeout | null = null;
  private duration: number;
  private timerInterval: NodeJS.Timeout | null = null;

  constructor(isMultiplayer: boolean, seed: number | null, duelId: string | null, refreshCallback: () => void) {
    this.isMultiplayer = isMultiplayer;
    this.refreshCallback = refreshCallback;
    this.seed = seed;
    this.rand = new Rand(seed ? seed.toString() : undefined);
    this.duelId = duelId;
    this.board = createEmptyBoard();
    this.activePiece = this.generatePiece();
    this.nextPiece = this.generatePiece();
    this.ghostPiece = computeGhostPiece(this.board, this.activePiece);
    this.holdPiece = null;
    this.score = 0;
    this.lines = 0;
    this.isPaused = false;
    this.hasHeld = false;
    this.gameOver = false;
    this.gameStarted = false;
    this.duration = 0;
  }

  private startGame() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startAutoDrop();
      this.startTimer();
    }
  }

  private triggerUpdate() {
    if (this.refreshCallback) {
      this.refreshCallback();
    }
  }

  private generatePiece(): Piece {
    return generateRandomPiece(this.rand);
  }

  moveLeft() {
    if (this.isPaused || this.gameOver) return;
    this.startGame();
    const test = { ...this.activePiece, col: this.activePiece.col - 1 };
    if (canPlacePiece(this.board, test)) {
      this.activePiece = test;
      this.updateGhostPiece(test);
      this.triggerUpdate();
    }
  }

  moveRight() {
    if (this.isPaused || this.gameOver) return;
    this.startGame();
    const test = { ...this.activePiece, col: this.activePiece.col + 1 };
    if (canPlacePiece(this.board, test)) {
      this.activePiece = test;
      this.updateGhostPiece(test);
      this.triggerUpdate();
    }
  }

  rotate() {
    if (this.isPaused || this.gameOver) return;
    this.startGame();
    const rotated = this.activePiece.shape[0].map((_, i) => this.activePiece.shape.map((row) => row[i]).reverse());
    const test = { ...this.activePiece, shape: rotated };
    if (canPlacePiece(this.board, test)) {
      this.activePiece = test;
      this.updateGhostPiece(test);
      this.triggerUpdate();
    }
  }

  softDrop() {
    if (this.isPaused || this.gameOver) return;
    this.startGame();
    const test = { ...this.activePiece, row: this.activePiece.row + 1 };
    if (canPlacePiece(this.board, test)) {
      this.activePiece = test;
    } else {
      this.placePiece();
    }
    this.triggerUpdate();
  }

  hardDrop() {
    if (this.isPaused || this.gameOver) return;
    while (canPlacePiece(this.board, { ...this.activePiece, row: this.activePiece.row + 1 })) {
      this.activePiece.row++;
    }
    this.placePiece();
  }

  private placePiece() {
    this.board = placePieceOnBoard(this.board, this.activePiece);
    const { newBoard, linesCleared } = clearCompleteLines(this.board);
    this.board = newBoard;
    this.lines += linesCleared;
    this.score += linesCleared * 100;

    const newActivePiece = { ...this.nextPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
    this.activePiece = newActivePiece;
    this.updateGhostPiece(newActivePiece);
    this.nextPiece = this.generatePiece();
    this.hasHeld = false;
    this.triggerUpdate();

    if (!canPlacePiece(this.board, this.activePiece)) {
      this.handleGameOver();
    }
  }

  private updateGhostPiece(newActivePiece: Piece) {
    this.ghostPiece = computeGhostPiece(this.board, newActivePiece);
  }

  hold() {
    if (this.isPaused || this.gameOver || this.hasHeld) return;
    this.startGame();
    if (this.holdPiece) {
      const temp = { ...this.holdPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
      this.holdPiece = this.activePiece;
      this.activePiece = temp;
      this.updateGhostPiece(temp);
    } else {
      this.holdPiece = this.activePiece;
      const newActivePiece = { ...this.nextPiece, row: 0, col: Math.floor(COLS / 2) - 1 };
      this.activePiece = newActivePiece;
      this.updateGhostPiece(newActivePiece);
      this.nextPiece = this.generatePiece();
    }
    this.hasHeld = true;
    this.triggerUpdate();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopAutoDrop();
      this.stopTimer();
    } else {
      this.startAutoDrop();
      this.startTimer();
    }
    this.triggerUpdate();
  }

  getState() {
    return {
      board: this.board,
      activePiece: this.activePiece,
      nextPiece: this.nextPiece,
      holdPiece: this.holdPiece,
      ghostPiece: this.ghostPiece,
      score: this.score,
      lines: this.lines,
      isPaused: this.isPaused,
      hasHeld: this.hasHeld,
      gameOver: this.gameOver,
      duelId: this.duelId,
      duration: this.duration,
    };
  }

  async handleGameOver() {
    this.gameOver = true;
    try {
      await saveGameScore(this.score, this.lines, this.duration, this.duelId);
    } catch (err) {
      console.error(err);
    }
  }

  retrieveGame(isMultiplayer: boolean, seed: number | null, duelId: string | null, refreshCallback: () => void) {
    if (isMultiplayer !== this.isMultiplayer || seed !== this.seed || duelId !== this.duelId) {
      return new TetrisGame(isMultiplayer, seed, duelId, refreshCallback);
    } else {
      if (!isMultiplayer && this.gameOver) {
        return new TetrisGame(false, null, null, refreshCallback);
      }
      return this;
    }
  }

  private startAutoDrop() {
    if (this.dropInterval) return;

    this.dropInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver && this.gameStarted) {
        this.softDrop();
      }
    }, 500);
  }

  private stopAutoDrop() {
    if (this.dropInterval) {
      clearInterval(this.dropInterval);
      this.dropInterval = null;
    }
  }

  private startTimer() {
    if (this.timerInterval) return;

    this.timerInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.duration += 1;
        this.triggerUpdate();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  quitGame() {
    this.isPaused = true;
    this.stopAutoDrop();
    this.stopTimer();
  }
}
