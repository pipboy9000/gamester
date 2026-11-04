# Gamester!

A lightweight quest-game guessing game. Watch a random moment from a long play, guess the game, then reveal its title, release year, and platform.

## Run locally

```sh
npm install
npm run dev
```

To create a production build, run `npm run build`.

## Game catalog

`src/data/games.ts` lists 48 classic and modern adventure, RPG, and action games from 1985 to 2025. Each row points to one YouTube long play and stores its `durationSeconds`. Every round starts at a random time between 0 and (duration - 120 seconds), so the last two minutes (credits) are never used.

The play screen includes a **Mask YouTube title** switch that covers a strip at the top of the embed. It is best-effort; fullscreen escapes the mask. Videos are embedded only, never downloaded or re-hosted. Run `node scripts/check-youtube-embeds.mjs` to confirm every video still embeds.
