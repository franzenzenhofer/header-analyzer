// Central configuration constants (<50 lines)
export const CONSTANTS = {
  // Pagination
  ITEMS_PER_PAGE: 50,
  MAX_HISTORY: 500,

  // Bot thresholds
  SUSPICIOUS_THRESHOLD: 50,
  PROBABLE_BOT_THRESHOLD: 70,

  // UI Labels
  LABELS: {
    BOT: 'BOT',
    MAYBE_BOT: 'MAYBE BOT',
    HUMAN: 'HUMAN',
    SUSPICIOUS: 'SUSPICIOUS'
  },

  // CSS Classes
  CLASSES: {
    BOT: 'bot-label',
    MAYBE_BOT: 'maybe-bot-label',
    HUMAN: 'human-label',
    REQUEST: 'request-full',
    NAV: 'nav',
    SUB: 'sub'
  },

  // Routes
  ROUTES: {
    HOME: '/',
    HISTORY: '/history',
    BOTS: '/bots',
    STATS: '/stats',
    DOWNLOAD: '/download',
    REQUEST: '/request/',
    API_JS: '/api/update-js/'
  },

  // Detection categories
  BOT_CATEGORIES: {
    AI: 'AI',
    SEARCH: 'Search',
    SOCIAL: 'Social',
    SEO: 'SEO',
    MONITORING: 'Monitoring',
    DEVELOPER: 'Developer'
  }
};