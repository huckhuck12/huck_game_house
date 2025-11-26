import React from 'react';
import { GameMetadata } from './types';

/**
 * 游戏配置中心
 * 
 * 如何添加新游戏：
 * 1. 在下方的 GAMES 数组中添加一个新的对象。
 * 2. 确保 id 唯一。
 * 3. thumbnail 推荐使用 600x600 或 1:1 比例的高清图片。
 * 4. 如果是外部网页游戏，请填写 externalUrl。
 * 5. category 可选值: 'Puzzle' | 'Action' | 'Strategy' | 'Classic' | 'Roguelike' | '3D'
 */

export const GAMES: GameMetadata[] = [
  {
    id: 'roguelike-survivor',
    title: '幸存者肉鸽',
    description: '在无尽的怪物潮中生存下来！升级你的技能，击败强大的敌人。',
    category: 'Roguelike',
    // 黑暗、地牢、火光氛围
    thumbnail: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=600',
    externalUrl: 'https://huckhuck12.github.io/roguelike_survivor/'
  },
  {
    id: 'sheep-match',
    title: '羊了个羊',
    description: '极高难度的方块消除游戏。考验你的观察力和策略。',
    category: 'Puzzle',
    // 羊、农场、明亮
    thumbnail: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600',
    externalUrl: 'https://huckhuck12.github.io/sheep_match/'
  },
  {
    id: 'tetris-3d',
    title: '3D 俄罗斯方块',
    description: '经典俄罗斯方块的 3D 进化版。体验立体空间消除。',
    category: '3D',
    // 积木、方块、色彩
    thumbnail: 'https://images.unsplash.com/photo-1605218427306-022ba8c290b8?auto=format&fit=crop&q=80&w=600',
    externalUrl: 'https://huckhuck12.github.io/tetris-3d/'
  },
  {
    id: 'jumpjump-h5',
    title: '3D 跳一跳',
    description: '按住蓄力，松开跳跃，看看你能跳多远！',
    category: '3D',
    // 天空、跳跃、极简
    thumbnail: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&q=80&w=600',
    externalUrl: 'https://huckhuck12.github.io/jumpjump-h5/'
  }
];
