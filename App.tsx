import React from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Gamepad2, Github, ExternalLink, Search, Menu, Loader2 } from 'lucide-react';
import { GAMES } from './constants';
import GameCard from './components/GameCard';
import ChatAssistant from './components/ChatAssistant';

// -- 页面 --

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-12">
      {/* 欢迎标语 */}
      <div className="py-8 text-center text-white drop-shadow-md">
        <h1 className="text-3xl md:text-5xl font-black mb-2">最好的免费在线游戏</h1>
        <p className="text-lg opacity-90 font-bold">Huck 的精选集 - 无需下载，点开即玩</p>
      </div>

      {/* 游戏网格 - 模仿 Poki 的紧凑网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {GAMES.map((game, index) => (
          <GameCard 
            key={game.id} 
            game={game} 
            large={index === 0} // 让第一个游戏显示为大卡片
          />
        ))}
        {/* 填充一些假卡片来展示布局效果 (如果游戏较少) */}
        {/* 这里我们只展示真实数据 */}
      </div>
    </div>
  );
};

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = GAMES.find(g => g.id === gameId);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // 重置加载状态
    setIsLoading(true);
    
    // 如果是内部组件（非 externalUrl），我们可以稍微模拟一下加载或直接完成
    // 目前常量中只有外部游戏，但为了健壮性保留此逻辑
    if (game && !game.externalUrl) {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }
  }, [gameId, game]);

  if (!game) {
    return <div className="text-center py-20 text-xl font-bold text-white">未找到游戏。<Link to="/" className="underline">返回首页</Link></div>;
  }

  const GameComponent = game.component;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-[#f0f9ff]">
      {/* 游戏区域 */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center relative custom-scrollbar">
        
        <div className="w-full max-w-6xl flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white">
            {/* 游戏标题栏 */}
            <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Gamepad2 className="text-blue-500" />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-gray-800 leading-tight">
                            {game.title}
                        </h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{game.category}</p>
                     </div>
                </div>
                <div className="flex gap-2">
                    {game.externalUrl && (
                        <a 
                            href={game.externalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm transition-colors flex items-center gap-2"
                        >
                            <ExternalLink size={16} /> <span className="hidden sm:inline">全屏</span>
                        </a>
                    )}
                    <Link to="/" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm transition-colors">
                        关闭
                    </Link>
                </div>
            </div>

            {/* 游戏画布 */}
            <div className="flex-1 bg-gray-900 relative group">
                 {/* 加载遮罩 */}
                 {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-white animate-in fade-in duration-300">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Gamepad2 size={24} className="text-blue-500/50" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black tracking-wide animate-pulse">正在启动游戏引擎...</h3>
                        <p className="text-gray-400 text-sm mt-2 font-bold opacity-75">{game.title}</p>
                    </div>
                 )}

                 {game.externalUrl ? (
                     <iframe 
                        src={game.externalUrl}
                        title={game.title}
                        className={`w-full h-full border-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                     />
                 ) : (
                     <div className={`w-full h-full flex items-center justify-center p-6 text-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        {GameComponent && <GameComponent />}
                     </div>
                 )}
            </div>
        </div>
      </div>

      {/* 侧边栏聊天 - 模仿右侧广告位/工具栏风格 */}
      <div className="h-1/3 lg:h-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 flex-shrink-0 z-10 bg-white shadow-lg">
        <ChatAssistant gameTitle={game.title} />
      </div>
    </div>
  );
};

// -- 布局外壳 --

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 顶部导航栏 - 浮动白色圆角风格 */}
      <div className="px-4 pt-4 pb-2 sticky top-0 z-50">
        <nav className="h-16 bg-white rounded-2xl shadow-lg flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
             {/* Logo 区域 */}
            <Link to="/" className="group flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md transform rotate-3 group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-xl italic">H</span>
              </div>
              <span className="text-2xl font-black text-gray-800 tracking-tight">
                Huck<span className="text-blue-500">Games</span>
              </span>
            </Link>
          </div>

          {/* 中间搜索栏 (装饰性) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input 
                type="text" 
                placeholder="搜索游戏..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-full text-sm font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                readOnly // 暂时只做展示
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/huckhuck12" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-bold text-sm transition-colors"
            >
              <Github size={18} />
              <span>开发者</span>
            </a>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 md:hidden">
                <Search size={20} />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 md:hidden">
                <Menu size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* 主要内容 */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play/:gameId" element={<GamePage />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
};

export default App;