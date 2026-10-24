# Trials Leaderboards

## Project Overview
Remastered leaderboard UI for three Trials games (Evolution, Fusion, Rising), built with TanStack Start.

## Tech Stack
- **Framework**: React 19 + TanStack Start (SSR) + TanStack Router (file-based routing)
- **Styling**: Tailwind CSS 4 + custom CSS (game-specific styles in `src/styles.css`)
- **Data**: tRPC + TanStack Query for leaderboard API
- **i18n**: Paraglide JS (en/de), base locale = en
- **Build**: Vite 7, TypeScript 5.7

## Architecture
- `src/routes/` - File-based routes. Game pages at `/evolution`, `/fusion`, `/rising`
- `src/data/` - Leaderboard seed data + faker-based generation
- `src/integrations/trpc/` - tRPC router with leaderboard procedures
- `src/components/` - Shared + game-specific components
- `public/trials/` - Game assets (fonts, images, flags, medals, badges)
- `trials-ui/` - Original HTML/CSS/JS reference (do NOT modify)

## Game Design Specs
| Game | BG Color | Text Color | Font | Scroll | Hover |
|------|----------|------------|------|--------|-------|
| Evolution | #614e32 (brown) | #ffac04 (yellow) | Segoe UI Bold Italic | Vertical lazy scroll | Selection BG image |
| Fusion | #1c2c3d (dark blue) | White + cyan shadow | Futura PT Medium | Paginated | Yellow #dbdb0b |
| Rising | BG image + blur | White + #2cffb9 accents | Oswald (Google) | Vertical scroll | Cyan #2cffb9 |

## Conventions
- Keep demo routes intact for reference
- Game routes use layout-free rendering (no Header/Footer from template)
- Each game page is a full-viewport immersive experience matching original game UI
- Use `@faker-js/faker` (already installed) for generating leaderboard data
- i18n keys prefixed by game: `evolution_*`, `fusion_*`, `rising_*`, `common_*`

## Commands
- `npm run dev` - Dev server on port 3000
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run check` - Prettier + ESLint fix
