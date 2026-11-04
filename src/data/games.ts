export type Game = {
  id: number
  title: string
  year: number
  platform: string
  youtubeId: string
  durationSeconds: number
}

// Each row is one long play. A random start time is picked per round from durationSeconds.
export const gameCatalog: Game[] = [
  { id: 1, title: 'The Legend of Zelda', year: 1986, platform: 'NES', youtubeId: 'M0FpCabABXc', durationSeconds: 13114 },
  { id: 2, title: 'Dragon Quest (Dragon Warrior)', year: 1986, platform: 'NES', youtubeId: 'jmzHrNVelL0', durationSeconds: 6348 },
  { id: 3, title: 'Final Fantasy', year: 1987, platform: 'NES', youtubeId: 'S6BA2MXiF08', durationSeconds: 29367 },
  { id: 4, title: 'Maniac Mansion', year: 1987, platform: 'Commodore 64', youtubeId: '0dVqe4a4oDo', durationSeconds: 7545 },
  { id: 5, title: 'The Secret of Monkey Island', year: 1990, platform: 'PC', youtubeId: 'ySmLlHTV5rU', durationSeconds: 13012 },
  { id: 6, title: 'The Legend of Zelda: A Link to the Past', year: 1991, platform: 'SNES', youtubeId: 'Z6hjG6MCcZ8', durationSeconds: 16156 },
  { id: 7, title: "King's Quest VI: Heir Today, Gone Tomorrow", year: 1992, platform: 'PC', youtubeId: 'EvrZ5haT9rE', durationSeconds: 18144 },
  { id: 8, title: 'Day of the Tentacle', year: 1993, platform: 'PC', youtubeId: 'dxqIHifKPms', durationSeconds: 12510 },
  { id: 9, title: 'Secret of Mana', year: 1993, platform: 'SNES', youtubeId: 'MsIOx0Hh_4g', durationSeconds: 33575 },
  { id: 10, title: 'Chrono Trigger', year: 1995, platform: 'SNES', youtubeId: 'Up9wQLnSNDE', durationSeconds: 60359 },
  { id: 11, title: 'Final Fantasy VII', year: 1997, platform: 'PlayStation', youtubeId: 'zOeZc1ap0Yc', durationSeconds: 85466 },
  { id: 12, title: 'The Legend of Zelda: Ocarina of Time', year: 1998, platform: 'Nintendo 64', youtubeId: '_KO2a83jfas', durationSeconds: 33692 },
  { id: 13, title: "Baldur's Gate", year: 1998, platform: 'PC', youtubeId: 'rhxw6itGmpk', durationSeconds: 21551 },
  { id: 14, title: 'Grim Fandango', year: 1998, platform: 'PC', youtubeId: 'bzBrdyGgoaw', durationSeconds: 18161 },
  { id: 15, title: 'Diablo II', year: 2000, platform: 'PC', youtubeId: 'sM7gA_xD7vE', durationSeconds: 40295 },
  { id: 16, title: 'The Elder Scrolls III: Morrowind', year: 2002, platform: 'PC / Xbox', youtubeId: 'KxDIuOIFvXg', durationSeconds: 68800 },
  { id: 17, title: 'The Legend of Zelda: The Wind Waker', year: 2002, platform: 'GameCube', youtubeId: 'QBWHTh7jGs8', durationSeconds: 37980 },
  { id: 18, title: 'Kingdom Hearts', year: 2002, platform: 'PlayStation 2', youtubeId: '68_yjAWlYls', durationSeconds: 31808 },
  { id: 19, title: 'Star Wars: Knights of the Old Republic', year: 2003, platform: 'PC / Xbox', youtubeId: 'xGPHIQGF4_Y', durationSeconds: 76684 },
  { id: 20, title: 'Dragon Age: Origins', year: 2009, platform: 'PC / PS3 / Xbox 360', youtubeId: 'Do6dkz50v-Q', durationSeconds: 111338 },
  { id: 21, title: 'The Elder Scrolls V: Skyrim', year: 2011, platform: 'PC / PS3 / Xbox 360', youtubeId: 'p0I7ccItmv8', durationSeconds: 76081 },
  { id: 22, title: 'Dark Souls', year: 2011, platform: 'PS3 / Xbox 360 / PC', youtubeId: 'WyD9BeFFTw0', durationSeconds: 72661 },
  { id: 23, title: 'The Witcher 3: Wild Hunt', year: 2015, platform: 'PC / PS4 / Xbox One', youtubeId: 'cn_taKva-AQ', durationSeconds: 119183 },
  { id: 24, title: 'The Legend of Zelda: Breath of the Wild', year: 2017, platform: 'Switch / Wii U', youtubeId: 'L33v62nN3Sg', durationSeconds: 76358 },
  { id: 25, title: 'Elden Ring', year: 2022, platform: 'PC / PS4 / PS5 / Xbox', youtubeId: 'bg8i4CvE74M', durationSeconds: 54002 },
  { id: 26, title: "Baldur's Gate 3", year: 2023, platform: 'PC / PS5 / Xbox Series', youtubeId: '2bcAIg7Pzm0', durationSeconds: 95259 },
  { id: 27, title: 'The Legend of Zelda: Tears of the Kingdom', year: 2023, platform: 'Switch', youtubeId: 'v3CM4vwb2Kc', durationSeconds: 72705 },
  { id: 28, title: 'Clair Obscur: Expedition 33', year: 2025, platform: 'PC / PS5 / Xbox Series', youtubeId: 'GhazUEpdII0', durationSeconds: 62754 },
  { id: 29, title: 'Fallout', year: 1997, platform: 'PC', youtubeId: 'dGZjse7uC_0', durationSeconds: 37087 },
  { id: 30, title: "Kirby's Adventure", year: 1993, platform: 'NES', youtubeId: 'rJXM4EPbPe0', durationSeconds: 8273 },
  { id: 31, title: 'Contra', year: 1987, platform: 'NES', youtubeId: 'qXcVojj2GXk', durationSeconds: 1388 },
  { id: 32, title: 'Gradius', year: 1986, platform: 'NES', youtubeId: 'xKnT_XQsFyU', durationSeconds: 1051 },
  { id: 33, title: 'Little Nemo: The Dream Master', year: 1990, platform: 'NES', youtubeId: 'wI9yf0NM61Q', durationSeconds: 3043 },
  { id: 34, title: 'Teenage Mutant Ninja Turtles', year: 1989, platform: 'NES', youtubeId: '2Xxe0TXGg-8', durationSeconds: 1417 },
  { id: 35, title: 'Teenage Mutant Ninja Turtles II: The Arcade Game', year: 1990, platform: 'NES', youtubeId: 'VOByN1F71tI', durationSeconds: 4302 },
  { id: 36, title: 'Teenage Mutant Ninja Turtles III: The Manhattan Project', year: 1991, platform: 'NES', youtubeId: 'QYJfkduIqwg', durationSeconds: 4627 },
  { id: 37, title: 'Jurassic Park', year: 1993, platform: 'NES', youtubeId: '-M8u9iKYlLA', durationSeconds: 4268 },
  { id: 38, title: 'Mega Man 4', year: 1991, platform: 'NES', youtubeId: 'Z8v_aLnf9Iw', durationSeconds: 3144 },
  { id: 39, title: 'Mega Man 5', year: 1992, platform: 'NES', youtubeId: 'tO6ZBTpxxCs', durationSeconds: 2731 },
  { id: 40, title: 'Mega Man 6', year: 1993, platform: 'NES', youtubeId: 'STlxjFnKh-o', durationSeconds: 2796 },
  { id: 41, title: 'The Immortal', year: 1990, platform: 'NES', youtubeId: 'QY3QEyyc23k', durationSeconds: 2391 },
  { id: 42, title: "Castlevania II: Simon's Quest", year: 1987, platform: 'NES', youtubeId: 'U1VNQRQ6wfc', durationSeconds: 5155 },
  { id: 43, title: 'Double Dragon II: The Revenge', year: 1989, platform: 'NES', youtubeId: 'v5ZyYhKGCFA', durationSeconds: 1705 },
  { id: 44, title: 'Double Dragon III: The Sacred Stones', year: 1991, platform: 'NES', youtubeId: 'Z5JvB3qpTZ0', durationSeconds: 2278 },
  { id: 45, title: 'Legendary Wings', year: 1988, platform: 'NES', youtubeId: 'NK5bgoafKzc', durationSeconds: 2388 },
  { id: 46, title: 'Gradius II', year: 1988, platform: 'NES', youtubeId: 'Dwxi83a7luQ', durationSeconds: 1639 },
  { id: 47, title: 'Journey to Silius', year: 1990, platform: 'NES', youtubeId: '5_Ztsa5mzA0', durationSeconds: 1700 },
  { id: 48, title: 'Super Mario Bros.', year: 1985, platform: 'NES', youtubeId: '7qirrV8w5SQ', durationSeconds: 1971 },
]
