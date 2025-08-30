# CineVerse

## Live

Production: https://cineverse-umber-three.vercel.app/

## Getting started

Prereqs: Node 18+ and npm.

1. Install deps

```
npm install
```

2. Create `.env` in the project root with your keys (UTF-8 encoding):

```
VITE_TMDB_API_KEY=your_tmdb_key_here
VITE_OMDB_API_KEY=your_omdb_key_here
```

3. Start the app

```
npm run dev
```

4. Build for production (optional)

```
npm run build
```

## Quick deploy

- Environment variables required:
	- VITE_TMDB_API_KEY
	- VITE_OMDB_API_KEY

- Netlify
	- Build command: vite build
	- Publish directory: dist
	- SPA routing: ensure `public/_redirects` contains `/*    /index.html   200`

- Vercel
	- Framework preset: Vite
	- Build command: vite build
	- Output directory: dist
	- Routing: SPA handled automatically
## Environment setup

Vite only exposes variables prefixed with `VITE_` to the client.

1. Create a `.env` file in the project root:

```
VITE_TMDB_API_KEY=your_tmdb_key_here
VITE_OMDB_API_KEY=your_omdb_key_here
```

2. Restart the dev server after editing `.env` so `import.meta.env` updates.

3. In code, always read via `import.meta.env.VITE_*` (do not use `process.env` in client code).

Troubleshooting:
- Ensure `.env` is at the project root (same directory as `package.json`).
- Close and re-run `npm run dev` after changes.
- For logs inside `vite.config.js`, `dotenv.config()` is used only for server-side checks.
- Save `.env` as UTF-8 (no BOM). If you see garbled characters, recreate the file and retype the two lines above.

## Deploy (Netlify/Vercel)

For Single Page App routing:

- Netlify: add a `_redirects` file in `public/` with:

```
/*    /index.html   200
```

- Vercel: SPA is handled automatically. Ensure `build` = `vite build`, `output` directory is `dist`.

Set environment variables in the hosting dashboard:
- `VITE_TMDB_API_KEY`
- `VITE_OMDB_API_KEY`

Then redeploy.

## Getting API keys

- TMDb: Create an account at https://www.themoviedb.org/, request an API key in settings, and use the v3 key as `VITE_TMDB_API_KEY`.
- OMDb: Get a free API key at https://www.omdbapi.com/apikey.aspx and set it as `VITE_OMDB_API_KEY` (optional but recommended for fallback ratings).
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
