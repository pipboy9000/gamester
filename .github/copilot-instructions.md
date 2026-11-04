# Gamester project notes

- Keep game metadata and playable long-play rows in `src/data/games.ts`. `platform` is the game's release platform(s) shown in the answer.
- Use long plays (no commentary) from established channels such as World-of-Longplays and LongplayArchive. Exclude trailers, reviews, and single-part series splits.
- Each round starts at a random time at least 2 minutes before the end (`durationSeconds` is stored per video). Re-check durations when swapping a video.
- YouTube embeds expose titles and the overlay is best-effort. Do not download or re-host YouTube videos.
- Run `node scripts/check-youtube-embeds.mjs` after editing video IDs. Keep the game client-side and lightweight.
