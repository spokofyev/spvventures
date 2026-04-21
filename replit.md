# SPV Ventures

A React + Vite web application migrated from Vercel to Replit.

## Tech Stack

- **React 19** with JSX
- **Vite 8** as the build tool and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Framer Motion** for animations
- **Lucide React** for icons

## Project Structure

```
src/
  App.jsx         # Root component
  main.jsx        # Entry point
  index.css       # Global styles
  App.css         # App-level styles
  components/     # Reusable UI components
  data/           # Static data files
  assets/         # Static assets
public/           # Public static files
```

## Running the App

The app runs via the "Start application" workflow using:

```
npm run dev
```

This starts Vite on port 5000, bound to `0.0.0.0` for Replit compatibility.

## Replit Configuration

- **Port**: 5000
- **Host**: `0.0.0.0` (required for Replit preview)
- **Workflow**: Start application → `npm run dev`
