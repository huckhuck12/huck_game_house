import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 通常部署在子路径下，如果你的仓库名是 repo-name，这里应该是 /repo-name/
  // 如果是 huckhuck12.github.io 这种主仓库，则保持 '/'
  // 为了安全起见，我们使用相对路径 './'，这样通常能适配大多数情况
  base: './',
});