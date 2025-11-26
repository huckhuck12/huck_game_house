export interface GameMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: 'Puzzle' | 'Action' | 'Strategy' | 'Classic' | 'Roguelike' | '3D';
  component?: React.ComponentType;
  externalUrl?: string;
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}