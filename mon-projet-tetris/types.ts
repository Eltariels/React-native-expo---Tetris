// types.ts

/** Représente la grille du Tetris : un tableau 2D de nombres */
export type Board = number[][];

/** Représente une pièce (forme + position). */
export interface Piece {
    shape: number[][]; // ex: [[1],[1],[1],[1]]
    row: number;
    col: number;
}
