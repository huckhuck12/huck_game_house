import React, { useState } from 'react';
import { GameStatus } from '../../types';
import { RefreshCw, X, Circle } from 'lucide-react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 行
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 列
      [0, 4, 8], [2, 4, 6]             // 对角线
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (status !== GameStatus.PLAYING || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setStatus(GameStatus.VICTORY);
    } else if (!newBoard.includes(null)) {
      setStatus(GameStatus.GAME_OVER); // 平局
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus(GameStatus.PLAYING);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-arcade-800 rounded-xl shadow-2xl border border-arcade-700">
      <div className="mb-6 text-2xl font-bold text-arcade-100 flex items-center gap-2">
        {status === GameStatus.PLAYING && (
          <span>回合: <span className="text-arcade-300">{isXNext ? 'X' : 'O'}</span></span>
        )}
        {status === GameStatus.VICTORY && (
          <span className="text-green-400">获胜者: {winner}</span>
        )}
        {status === GameStatus.GAME_OVER && (
          <span className="text-yellow-400">平局！</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-arcade-900 p-2 rounded-lg">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl font-bold rounded transition-all duration-200
              ${square ? 'bg-arcade-700' : 'bg-arcade-800 hover:bg-arcade-700'}
              ${square === 'X' ? 'text-arcade-300' : 'text-arcade-100'}
            `}
            onClick={() => handleClick(i)}
            disabled={status !== GameStatus.PLAYING}
          >
            {square === 'X' && <X size={48} />}
            {square === 'O' && <Circle size={40} />}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-8 px-6 py-2 bg-arcade-500 hover:bg-arcade-300 text-white rounded-full flex items-center gap-2 transition-colors font-bold"
      >
        <RefreshCw size={18} /> 重新开始
      </button>
    </div>
  );
};

export default TicTacToe;