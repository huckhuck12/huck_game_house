import React, { useState } from 'react';
import { GameMetadata } from '../types';
import { Play, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: GameMetadata;
  large?: boolean; // 支持不同尺寸的卡片
}

const GameCard: React.FC<GameCardProps> = ({ game, large }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Link 
      to={`/play/${game.id}`}
      className={`
        group relative block bg-white rounded-3xl overflow-hidden 
        shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.15)]
        transform transition-all duration-300 ease-out 
        hover:-translate-y-2 hover:scale-[1.03] cursor-pointer
        ${large ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
        aspect-square ring-4 ring-transparent hover:ring-white/30
      `}
    >
      {/* Loading Placeholder */}
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
           <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
      )}

      {/* 图片 - 悬停时放大并轻微旋转 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          onLoad={() => setIsImageLoading(false)}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-in-out 
            group-hover:scale-110 group-hover:rotate-1 
            ${isImageLoading ? 'opacity-0' : 'opacity-100'}
          `}
        />
      </div>
      
      {/* 悬停遮罩 - 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
        
        {/* 播放按钮 - 弹性弹出动画 */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] mb-3 hover:bg-blue-50">
          <Play fill="#3b82f6" className="text-blue-500 ml-1.5 w-8 h-8" />
        </div>
        
        {/* 标题 - 上滑淡入 */}
        <span className="text-white font-black text-xl tracking-wide drop-shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          {game.title}
        </span>

        {/* 类别标签 - 延迟淡入 */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
           <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm tracking-wider">
             {game.category}
           </span>
        </div>
      </div>
      
    </Link>
  );
};

export default GameCard;