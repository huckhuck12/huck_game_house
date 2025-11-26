import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameStatus } from '../../types';
import { Play, RotateCcw, Pause } from 'lucide-react';

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_VELOCITY = { x: 0, y: 0 };

const Snake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [velocity, setVelocity] = useState(INITIAL_VELOCITY);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [highScore, setHighScore] = useState(0);

  // 音效引用 (占位符)
  // const eatSound = useRef(new Audio('/eat.mp3'));

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setVelocity({ x: 1, y: 0 }); // 立即向右移动
    setScore(0);
    setStatus(GameStatus.PLAYING);
    setFood(generateFood());
  };

  const startGame = () => {
    if (status === GameStatus.GAME_OVER || status === GameStatus.IDLE) {
      resetGame();
    } else {
      setStatus(status === GameStatus.PLAYING ? GameStatus.IDLE : GameStatus.PLAYING);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (status !== GameStatus.PLAYING) return;
    
    switch (e.key) {
      case 'ArrowUp':
        if (velocity.y === 0) setVelocity({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (velocity.y === 0) setVelocity({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (velocity.x === 0) setVelocity({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (velocity.x === 0) setVelocity({ x: 1, y: 0 });
        break;
    }
  }, [velocity, status]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (status !== GameStatus.PLAYING) return;

    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        head.x += velocity.x;
        head.y += velocity.y;

        // 撞墙检测
        if (
          head.x < 0 ||
          head.x >= CANVAS_SIZE / GRID_SIZE ||
          head.y < 0 ||
          head.y >= CANVAS_SIZE / GRID_SIZE
        ) {
          setStatus(GameStatus.GAME_OVER);
          return prevSnake;
        }

        // 自撞检测
        for (let i = 0; i < prevSnake.length; i++) {
          if (head.x === prevSnake[i].x && head.y === prevSnake[i].y) {
            setStatus(GameStatus.GAME_OVER);
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // 吃到食物
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
          });
          setFood(generateFood());
          // 不移除尾部，使蛇变长
        } else {
          newSnake.pop(); // 移动
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [status, velocity, food, highScore, generateFood]);

  // 渲染
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    // 清除画布
    context.fillStyle = '#1a102e'; // 深色背景
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 绘制食物
    context.fillStyle = '#ff0080'; // 霓虹粉食物
    context.beginPath();
    context.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    context.fill();

    // 绘制蛇
    context.fillStyle = '#79ffe1'; // 霓虹青蛇
    snake.forEach((segment) => {
      context.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // 网格线 (可选的微妙效果)
    context.strokeStyle = '#2d1b4e';
    context.lineWidth = 0.5;
    for(let i=0; i <= CANVAS_SIZE; i+= GRID_SIZE) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, CANVAS_SIZE);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(CANVAS_SIZE, i);
        context.stroke();
    }

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full max-w-[400px] text-arcade-100 font-mono">
        <div>得分: {score}</div>
        <div>最高分: {highScore}</div>
      </div>
      
      <div className="relative rounded-xl overflow-hidden border-2 border-arcade-500 shadow-[0_0_20px_rgba(121,40,202,0.3)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block bg-arcade-900"
        />
        
        {status === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white animate-in fade-in">
            <h2 className="text-4xl font-bold text-red-500 mb-2">游戏结束</h2>
            <p className="mb-4">最终得分: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-arcade-500 hover:bg-arcade-300 rounded-full font-bold flex items-center gap-2"
            >
              <RotateCcw size={16} /> 再试一次
            </button>
          </div>
        )}

        {status === GameStatus.IDLE && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-arcade-100 text-arcade-900 hover:bg-white rounded-full font-bold text-xl flex items-center gap-2 shadow-lg transform transition-transform hover:scale-105"
            >
              <Play size={24} /> 开始游戏
            </button>
          </div>
        )}
      </div>

      <div className="text-arcade-300 text-sm mt-2">
        使用方向键移动
      </div>
    </div>
  );
};

export default Snake;