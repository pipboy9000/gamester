import { useEffect, useState } from 'react'
import { gameCatalog, type Game } from './data/games'
import './App.css'

type Screen = 'home' | 'play'
type GameDeck = { drawPile: number[]; discardPile: number[] }
type Round = { game: Game; startSeconds: number }

const youtubeMaskStorageKey = 'questster-youtube-mask-enabled'
const gameDeckStorageKey = 'questster-game-deck-v1'
const endBufferSeconds = 120

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

function randomStart(game: Game): number {
  return Math.floor(Math.random() * Math.max(1, game.durationSeconds - endBufferSeconds))
}

function loadGameDeck(availableIds: number[]): GameDeck {
  try {
    const saved = window.localStorage.getItem(gameDeckStorageKey)
    if (saved) {
      const parsed: unknown = JSON.parse(saved)
      if (
        typeof parsed === 'object' && parsed !== null &&
        'drawPile' in parsed && Array.isArray(parsed.drawPile) &&
        'discardPile' in parsed && Array.isArray(parsed.discardPile)
      ) {
        const available = new Set(availableIds)
        const drawPile = [...new Set(parsed.drawPile.filter((id): id is number => typeof id === 'number' && available.has(id)))]
        const drawSet = new Set(drawPile)
        const discardPile = [...new Set(parsed.discardPile.filter((id): id is number => typeof id === 'number' && available.has(id) && !drawSet.has(id)))]
        const accounted = new Set([...drawPile, ...discardPile])
        return { drawPile: [...drawPile, ...shuffle(availableIds.filter((id) => !accounted.has(id)))], discardPile }
      }
    }
  } catch {
    return { drawPile: shuffle(availableIds), discardPile: [] }
  }
  return { drawPile: shuffle(availableIds), discardPile: [] }
}

function saveGameDeck(deck: GameDeck) {
  try {
    window.localStorage.setItem(gameDeckStorageKey, JSON.stringify(deck))
  } catch {
    // The game remains playable when browser storage is unavailable.
  }
}

function currentScreen(): Screen {
  return window.location.pathname === '/play' ? 'play' : 'home'
}

function App() {
  const gamesById = new Map(gameCatalog.map((game) => [game.id, game]))
  const [screen, setScreen] = useState<Screen>(currentScreen)
  const [round, setRound] = useState<Round | null>(null)
  const [gameDeck, setGameDeck] = useState<GameDeck>(() => loadGameDeck(gameCatalog.map((game) => game.id)))
  const [answerVisible, setAnswerVisible] = useState(false)
  const [youtubeMaskEnabled, setYoutubeMaskEnabled] = useState(() => {
    try {
      return window.localStorage.getItem(youtubeMaskStorageKey) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const syncScreen = () => setScreen(currentScreen())
    window.addEventListener('popstate', syncScreen)
    return () => window.removeEventListener('popstate', syncScreen)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(youtubeMaskStorageKey, String(youtubeMaskEnabled))
    } catch {
      // The toggle remains usable when browser storage is unavailable.
    }
  }, [youtubeMaskEnabled])

  function navigate(nextScreen: Screen) {
    const nextPath = nextScreen === 'play' ? '/play' : '/'
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
    setScreen(nextScreen)
  }

  function pickGame() {
    let drawPile = gameDeck.drawPile
    let discardPile = gameDeck.discardPile
    if (drawPile.length === 0) {
      if (discardPile.length === 0) return
      drawPile = shuffle(discardPile)
      discardPile = []
    }

    const [nextId, ...remainingIds] = drawPile
    const nextGame = gamesById.get(nextId)
    if (!nextGame) return
    const nextDeck = { drawPile: remainingIds, discardPile: [...discardPile, nextId] }

    setGameDeck(nextDeck)
    saveGameDeck(nextDeck)
    setRound({ game: nextGame, startSeconds: randomStart(nextGame) })
    setAnswerVisible(false)
  }

  function handleGameAction() {
    if (!round || answerVisible) {
      pickGame()
      return
    }
    setAnswerVisible(true)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => navigate('home')} aria-label="Gamester home">
          <span className="wordmark-mark" aria-hidden="true">G</span>
          <span>gamester<span className="wordmark-period">!</span></span>
        </button>
        <div className="topbar-right">
          <span className="edition-label">THE QUEST GAME QUIZ</span>
          {screen === 'play' ? (
            <button className="text-link" onClick={() => navigate('home')}>How to play</button>
          ) : (
            <button className="text-link" onClick={() => navigate('play')}>Start a game <span aria-hidden="true">↗</span></button>
          )}
        </div>
      </header>

      {screen === 'home' ? (
        <section className="home-page">
          <div className="home-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A little test of your gaming memory</div>
            <h1><span>Name the game.</span></h1>
            <p className="home-intro">A random moment from a long play. No title, no hints. Watch, guess, then see if you got it right.</p>
            <button className="primary-button home-cta" onClick={() => navigate('play')}>
              Start playing <span aria-hidden="true">↗</span>
            </button>
            <div className="home-note"><span className="live-dot" /> No accounts. Just good games.</div>
          </div>

          <div className="reel-display" aria-label="A selection of games in the Gamester catalog">
            <div className="reel-heading"><span>ON THE SHELF</span><span>VOL. 01</span></div>
            <div className="reel-stack">
              {gameCatalog.slice(4, 7).map((game, index) => (
                <div className={`reel-card reel-card-${index + 1}`} key={game.id}>
                  <div className="reel-card-shade" />
                  <span className="reel-card-year">{game.year}</span>
                  <span className="reel-card-title">{game.title}</span>
                  <span className="reel-card-mark" aria-hidden="true">✳</span>
                </div>
              ))}
            </div>
            <div className="reel-footer"><span>CLASSICS, CULT FAVORITES</span><span>& NEW OBSESSIONS</span></div>
          </div>

          <div className="how-section" id="how-to-play">
            <div className="how-title">
              <span className="section-kicker">HOW IT WORKS</span>
              <h2>Three steps.<br />One great game night.</h2>
            </div>
            <ol className="steps-list">
              <li><span className="step-number">01</span><div><h3>Press next game</h3><p>A random moment from a long play appears. Keep the title hidden from the room.</p></div></li>
              <li><span className="step-number">02</span><div><h3>Make your guess</h3><p>Watch the gameplay, compare notes, and lock in your answer.</p></div></li>
              <li><span className="step-number">03</span><div><h3>Show the answer</h3><p>Reveal the game, release year, and platform. Then go again.</p></div></li>
            </ol>
          </div>
          <footer className="page-footer"><span>GAME NIGHT, SORTED.</span><span>MADE FOR THE LOVE OF QUESTS <span className="footer-star">✳</span></span></footer>
        </section>
      ) : (
        <section className="play-page">
          <div className="play-heading">
            <div><span className="section-kicker">THE ARCADE ROOM</span><h1>Take your guess.</h1></div>
            <span className="round-label"><span className="live-dot" /> RANDOM ROUND</span>
          </div>

          <div className={`screening-stage${round ? ' has-movie' : ''}`}>
            {round ? (
              <>
                <div className="video-frame is-youtube">
                  <iframe
                    key={`${round.game.id}-${round.startSeconds}`}
                    src={`https://www.youtube-nocookie.com/embed/${round.game.youtubeId}?autoplay=1&playsinline=1&rel=0&start=${round.startSeconds}`}
                    title="Game long play"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  {youtubeMaskEnabled && <div className="youtube-title-mask" aria-hidden="true" />}
                  <div className="frame-caption"><span>ROUND {String(round.game.id).padStart(2, '0')}</span><span>NO HINTS. JUST VIBES.</span></div>
                </div>
                <label className="youtube-mask-toggle">
                  <input
                    type="checkbox"
                    checked={youtubeMaskEnabled}
                    onChange={(event) => setYoutubeMaskEnabled(event.target.checked)}
                  />
                  <span className="toggle-track" aria-hidden="true"><span className="toggle-thumb" /></span>
                  <span>Mask YouTube title</span>
                </label>
              </>
            ) : (
              <div className="empty-screen">
                <div className="projector-icon" aria-hidden="true"><span /><span /><span /></div>
                <span className="section-kicker">YOUR SCREEN IS READY</span>
                <h2>What game is it?</h2>
                <p>Hit next game to jump into a random moment of a long play.</p>
              </div>
            )}
          </div>

          <div className="play-controls">
            {answerVisible && round ? (
              <div className="answer-reveal" aria-live="polite">
                <span className="answer-icon" aria-hidden="true">✳</span>
                <div className="answer-text">
                  <span className="section-kicker">The answer</span>
                  <h2>{round.game.title}</h2>
                  <p>{round.game.year} <span className="answer-separator">/</span> {round.game.platform}</p>
                </div>
              </div>
            ) : (
              <div className="play-prompt"><span className="prompt-star" aria-hidden="true">✳</span><span>{round ? 'Got a guess?' : 'Ready when you are.'}</span></div>
            )}
            <button className="primary-button play-cta" onClick={handleGameAction}>
              {!round || answerVisible ? 'Next game' : 'Show answer'}
              <span aria-hidden="true">{!round || answerVisible ? '↗' : '✳'}</span>
            </button>
          </div>
          <div className="catalog-note"><span className="catalog-dot" /> {gameDeck.drawPile.length} games in deck <span className="catalog-divider">/</span> {gameDeck.discardPile.length} discarded <span className="catalog-divider">/</span> {gameCatalog.length} long plays</div>
          <footer className="page-footer"><span>GAME NIGHT, SORTED.</span><span>TAKE YOUR TIME <span className="footer-star">✳</span></span></footer>
        </section>
      )}
    </main>
  )
}

export default App
