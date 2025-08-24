import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
});

console.log(process.env.VITE_OMDB_API_KEY);