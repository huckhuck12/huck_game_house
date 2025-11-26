<div align="center">

# 🎮 Huck Games - 在线游戏平台

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF.svg)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-orange.svg)](https://ai.google.dev/)

一个现代化的在线游戏平台，集成了多款精彩游戏和 AI 智能助手功能

[在线体验](https://ai.studio/apps/drive/11SGTQ0NO9rKwIFH8fS5MFnhqXvL9fklN) • [报告问题](https://github.com/huckhuck12/huck_game_house/issues) • [开发者主页](https://github.com/huckhuck12)

</div>

---

## ✨ 特性

- 🎯 **多款游戏** - 集成 Roguelike、益智、3D 等多种类型游戏
- 🤖 **AI 助手** - 基于 Google Gemini 的智能游戏助手
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🎨 **精美 UI** - 类 Poki 风格的现代化界面设计
- ⚡ **极速加载** - 基于 Vite 构建，开发和生产环境都极速
- 🎮 **即点即玩** - 无需下载，浏览器直接畅玩

## 🎮 游戏列表


| 游戏名称         | 类型      | 描述                                   |
| ---------------- | --------- | -------------------------------------- |
| 🎲 幸存者肉鸽    | Roguelike | 在无尽的怪物潮中生存，升级技能击败强敌 |
| 🐑 羊了个羊      | Puzzle    | 极高难度的方块消除游戏，考验观察力     |
| 🧱 3D 俄罗斯方块 | 3D        | 经典俄罗斯方块的 3D 进化版             |
| 🦘 3D 跳一跳     | 3D        | 按住蓄力，松开跳跃，挑战你的极限       |

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0

### 本地运行

1. **克隆项目**

```bash
git clone https://github.com/huckhuck12/huck_game_house.git
cd huck_game_house
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

在项目根目录创建 `.env.local` 文件，并添加你的 Gemini API Key：

```env
API_KEY=你的_Gemini_API_密钥
```

> 💡 **获取 API Key**: 访问 [Google AI Studio](https://makersuite.google.com/app/apikey) 获取免费的 API 密钥

4. **启动开发服务器**

```bash
npm run dev
```

5. **打开浏览器**

访问 `http://localhost:5173` 即可开始体验

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建产物将生成在 `dist` 目录，可直接部署到任何静态托管服务（如 GitHub Pages、Vercel、Netlify 等）。

## 🛠️ 技术栈

### 核心框架

- **[React 18](https://reactjs.org/)** - 用户界面构建库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript 超集
- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具

### UI & 样式

- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Lucide React](https://lucide.dev/)** - 精美的图标库

### 路由 & 状态

- **[React Router DOM](https://reactrouter.com/)** - 声明式路由管理

### AI 能力

- **[@google/genai](https://ai.google.dev/)** - Google Gemini AI SDK
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown 渲染

## 📁 项目结构

```
huck_game_house/
├── components/              # React 组件
│   ├── games/              # 游戏组件（预留）
│   │   ├── Memory.tsx      # 记忆卡片游戏
│   │   ├── Snake.tsx       # 贪吃蛇游戏
│   │   └── TicTacToe.tsx   # 井字棋游戏
│   ├── ChatAssistant.tsx   # AI 聊天助手
│   └── GameCard.tsx        # 游戏卡片组件
├── services/               # 服务层
│   └── geminiService.ts    # Gemini AI 服务封装
├── App.tsx                 # 应用主组件
├── constants.tsx           # 游戏配置常量
├── types.ts                # TypeScript 类型定义
├── index.tsx               # 应用入口
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 🎨 添加新游戏

在 `constants.tsx` 中添加游戏配置：

```typescript
export const GAMES: GameMetadata[] = [
  // ... 现有游戏
  {
    id: 'your-game-id',           // 唯一标识
    title: '游戏名称',             // 显示名称
    description: '游戏描述',       // 简短描述
    category: 'Action',            // 游戏类别
    thumbnail: 'https://...',      // 缩略图 URL (推荐 600x600)
    externalUrl: 'https://...'     // 游戏 URL (可选)
  }
];
```

### 游戏类别

- `Puzzle` - 益智类
- `Action` - 动作类
- `Strategy` - 策略类
- `Classic` - 经典类
- `Roguelike` - 肉鸽类
- `3D` - 3D 游戏

## 🤖 AI 助手功能

AI 助手基于 **Gemini 2.5 Flash** 模型，为每个游戏提供：

- 💬 实时对话交互
- 📝 游戏策略建议
- 🎯 规则解释说明
- 🎉 鼓励与陪伴
- ✨ 流式响应渲染

### 自定义 AI 行为

编辑 `services/geminiService.ts` 中的 `systemInstruction` 来调整 AI 助手的行为风格。

## 🔧 开发脚本

```bash
# 开发模式（热重载）
npm run dev

# 类型检查 + 构建
npm run build

# 预览生产构建
npm run preview
```

## 🌐 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 📝 开发计划

- [ ]  实现搜索功能
- [ ]  添加游戏收藏功能
- [ ]  用户游戏历史记录
- [ ]  多语言支持
- [ ]  暗黑模式
- [ ]  离线 PWA 支持
- [ ]  游戏评分和评论系统

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 开源协议

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- UI 设计灵感来自 [Poki](https://poki.com/)
- 图标来自 [Lucide](https://lucide.dev/)
- 字体来自 [Google Fonts - Nunito](https://fonts.google.com/specimen/Nunito)
- AI 能力由 [Google Gemini](https://ai.google.dev/) 提供

## 📧 联系方式

- GitHub: [@huckhuck12](https://github.com/huckhuck12)
- AI Studio: [查看应用](https://ai.studio/apps/drive/11SGTQ0NO9rKwIFH8fS5MFnhqXvL9fklN)

---

<div align="center">

**[⬆ 回到顶部](#-huck-games---在线游戏平台)**

Made with ❤️ by Huckhuck12

</div>
