import React, { useState, useEffect } from 'react';
import { GameStatus } from '../../types';
import { RefreshCw, Zap, Star, Heart, Cloud, Moon, Sun, Anchor } from 'lucide-react';

const ICONS = [Zap, Star, Heart, Cloud, Moon, Sun, Anchor]; // 7 对 = 14 张卡片是奇数，让我们用 8 对来做 4x4
import { Music } from 'lucide-react';

const CARD_ICONS = [Zap, Star, Heart, Cloud, Moon, Sun, Anchor, Music];

interface Card {
  id: number;
  iconId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const Memory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);

  const initializeGame = () => {
    const doubled = [...CARD_ICONS, ...CARD_ICONS];
    const shuffled = doubled
      .map((icon, index) => ({ icon, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        id: index,
        iconId: CARD_ICONS.indexOf(item.icon),
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setStatus(GameStatus.PLAYING);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (status !== GameStatus.PLAYING) return;
    // 防止点击已经翻开或匹配的卡片，或者已经翻开两张卡片
    if (flippedCards.length >= 2 || cards.find(c => c.id === id)?.isFlipped || cards.find(c => c.id === id)?.isMatched) {
      return;
    }

    const newCards = [...cards];
    const cardIndex = newCards.findIndex(c => c.id === id);
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      checkForMatch(newFlipped, newCards);
    }
  };

  const checkForMatch = (currentFlippedIds: number[], currentCards: Card[]) => {
    const [firstId, secondId] = currentFlippedIds;
    const firstCard = currentCards.find(c => c.id === firstId);
    const secondCard = currentCards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.iconId === secondCard.iconId) {
      // 匹配成功
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, isMatched: true, isFlipped: true } 
            : card
        ));
        setFlippedCards([]);
        
        // 检查胜利条件
        const allMatched = currentCards.every(c => c.isMatched || c.id === firstId || c.id === secondId);
        if (allMatched) setStatus(GameStatus.VICTORY);

      }, 500);
    } else {
      // 不匹配
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, isFlipped: false } 
            : card
        ));
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center w-full mb-6 px-4">
        <div className="text-arcade-100 font-mono text-xl">步数: {moves}</div>
        <button 
          onClick={initializeGame}
          className="px-4 py-2 bg-arcade-700 hover:bg-arcade-500 rounded-lg flex items-center gap-2 transition-colors text-sm font-bold"
        >
          <RefreshCw size={16} /> 重置
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 bg-arcade-800 rounded-2xl border-4 border-arcade-700">
        {cards.map(card => {
          const Icon = CARD_ICONS[card.iconId];
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center transition-all duration-500 transform
                ${card.isFlipped || card.isMatched ? 'rotate-y-180 bg-arcade-100' : 'bg-arcade-900 hover:bg-arcade-600'}
                ${card.isMatched ? 'opacity-50' : 'opacity-100'}
              `}
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {(card.isFlipped || card.isMatched) ? (
                <Icon size={32} className="text-arcade-800 animate-in zoom-in" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-arcade-700">
                  <span className="text-2xl font-bold">?</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {status === GameStatus.VICTORY && (
        <div className="mt-8 text-center animate-bounce">
          <h2 className="text-3xl font-bold text-green-400 mb-2">胜利！</h2>
          <p className="text-arcade-300">你用了 {moves} 步完成了游戏。</p>
        </div>
      )}
    </div>
  );
};

export default Memory;