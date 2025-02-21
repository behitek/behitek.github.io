import Layout from '@theme/Layout';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const DIFFICULTIES = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};

const createBoard = (rows, cols, mines) => {
    const board = Array(rows).fill().map(() =>
        Array(cols).fill().map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0
        }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate neighbor mines
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (row + i >= 0 && row + i < rows && col + j >= 0 && col + j < cols) {
                            if (board[row + i][col + j].isMine) count++;
                        }
                    }
                }
                board[row][col].neighborMines = count;
            }
        }
    }

    return board;
};

const MinesweeperGame = () => {
    const [difficulty, setDifficulty] = useState('medium');
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [flagsPlaced, setFlagsPlaced] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        resetGame();
    }, [difficulty]);

    useEffect(() => {
        let interval;
        if (timerActive && !gameOver && !gameWon) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, gameOver, gameWon]);

    const resetGame = () => {
        const { rows, cols, mines } = DIFFICULTIES[difficulty];
        setBoard(createBoard(rows, cols, mines));
        setGameOver(false);
        setGameWon(false);
        setFlagsPlaced(0);
        setTime(0);
        setTimerActive(false);
    };

    const revealCell = (row, col) => {
        if (gameOver || gameWon || board[row][col].isRevealed || board[row][col].isFlagged) return;

        if (!timerActive) {
            setTimerActive(true);
            // Ensure first click is safe
            if (board[row][col].isMine) {
                const newBoard = [...board];
                // Remove mine from current cell
                newBoard[row][col].isMine = false;
                
                // Find a new spot for the mine
                let placed = false;
                while (!placed) {
                    const newRow = Math.floor(Math.random() * board.length);
                    const newCol = Math.floor(Math.random() * board[0].length);
                    if (!newBoard[newRow][newCol].isMine && (newRow !== row || newCol !== col)) {
                        newBoard[newRow][newCol].isMine = true;
                        placed = true;
                    }
                }

                // Recalculate neighbor counts
                for (let r = 0; r < board.length; r++) {
                    for (let c = 0; c < board[0].length; c++) {
                        if (!newBoard[r][c].isMine) {
                            let count = 0;
                            for (let i = -1; i <= 1; i++) {
                                for (let j = -1; j <= 1; j++) {
                                    if (r + i >= 0 && r + i < board.length && c + j >= 0 && c + j < board[0].length) {
                                        if (newBoard[r + i][c + j].isMine) count++;
                                    }
                                }
                            }
                            newBoard[r][c].neighborMines = count;
                        }
                    }
                }
                setBoard(newBoard);
            }
        }

        const newBoard = [...board];

        if (newBoard[row][col].isMine) {
            // Game Over - reveal all mines
            newBoard.forEach(row => row.forEach(cell => {
                if (cell.isMine) cell.isRevealed = true;
            }));
            setGameOver(true);
        } else {
            // Reveal clicked cell and neighbors if empty
            const revealNeighbors = (r, c) => {
                if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
                if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;

                newBoard[r][c].isRevealed = true;

                if (newBoard[r][c].neighborMines === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            revealNeighbors(r + i, c + j);
                        }
                    }
                }
            };

            revealNeighbors(row, col);
        }

        setBoard(newBoard);

        // Check for win
        const unrevealedCount = newBoard.flat().filter(cell => !cell.isRevealed).length;
        if (unrevealedCount === DIFFICULTIES[difficulty].mines) {
            setGameWon(true);
        }
    };

    const toggleFlag = (row, col, e) => {
        e.preventDefault();
        if (gameOver || gameWon || board[row][col].isRevealed) return;

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (!cell.isFlagged && flagsPlaced >= DIFFICULTIES[difficulty].mines) return;

        cell.isFlagged = !cell.isFlagged;
        setFlagsPlaced(prev => cell.isFlagged ? prev + 1 : prev - 1);
        setBoard(newBoard);
    };

    const renderCell = (cell, row, col) => {
        let content = '';
        let className = styles.cell;

        if (cell.isRevealed) {
            className += ` ${styles.revealed}`;
            if (cell.isMine) {
                content = '💣';
                className += ` ${styles.mine}`;
            } else if (cell.neighborMines > 0) {
                content = cell.neighborMines;
                className += ` ${styles[`number-${cell.neighborMines}`]}`;
            }
        } else if (cell.isFlagged) {
            content = '🚩';
            className += ` ${styles.flag}`;
        }

        return (
            <button
                key={`${row}-${col}`}
                className={className}
                onClick={() => revealCell(row, col)}
                onContextMenu={(e) => toggleFlag(row, col, e)}
            >
                {content}
            </button>
        );
    };

    return (
        <Layout title="Minesweeper">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Minesweeper</h1>
                </div>

                <div className={styles.gameContainer}>
                    <div className={styles.controls}>
                        {Object.keys(DIFFICULTIES).map(mode => (
                            <button
                                key={mode}
                                className={`${styles.button} ${mode === difficulty ? styles.active : ''}`}
                                onClick={() => setDifficulty(mode)}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                        <button className={styles.button} onClick={resetGame}>Reset</button>
                    </div>

                    <div className={styles.gameStatus}>
                        <span>💣 {DIFFICULTIES[difficulty].mines - flagsPlaced}</span>
                        <span>⏱️ {String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}</span>
                        <span>
                            {gameOver ? '💥 Game Over!' : gameWon ? '🎉 You Win!' : 'Playing...'}
                        </span>
                    </div>

                    <div
                        className={styles.grid}
                        style={{
                            gridTemplateColumns: `repeat(${DIFFICULTIES[difficulty].cols}, 30px)`,
                            gridTemplateRows: `repeat(${DIFFICULTIES[difficulty].rows}, 30px)`
                        }}
                    >
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MinesweeperGame;