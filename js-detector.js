// Comprehensive JavaScript Feature Detection System
// Tests 100% of features for complete browser capability analysis

export const JS_FEATURE_TESTS = {
  // JavaScript Version & Core Features
  jsVersion: {
    ES5: () => {
      try {
        return !!(Function.prototype.bind && Array.prototype.forEach);
      } catch (e) { return false; }
    },
    ES6: () => {
      try {
        eval('const a = 1; let b = 2; () => {}');
        return typeof Symbol !== 'undefined' && typeof Promise !== 'undefined';
      } catch (e) { return false; }
    },
    ES7: () => {
      try {
        return typeof Array.prototype.includes === 'function';
      } catch (e) { return false; }
    },
    ES8: () => {
      try {
        return typeof Object.values === 'function' && typeof Object.entries === 'function';
      } catch (e) { return false; }
    },
    ES9: () => {
      try {
        eval('async function* gen() {}');
        return true;
      } catch (e) { return false; }
    },
    ES10: () => {
      try {
        return typeof Array.prototype.flat === 'function';
      } catch (e) { return false; }
    },
    ES11: () => {
      try {
        return typeof Promise.allSettled === 'function' && typeof BigInt !== 'undefined';
      } catch (e) { return false; }
    },
    ES12: () => {
      try {
        return typeof String.prototype.replaceAll === 'function';
      } catch (e) { return false; }
    },
    ES13: () => {
      try {
        return typeof Array.prototype.at === 'function';
      } catch (e) { return false; }
    }
  },

  // DOM APIs
  domAPIs: {
    querySelector: () => typeof document.querySelector === 'function',
    querySelectorAll: () => typeof document.querySelectorAll === 'function',
    classList: () => document.createElement('div').classList !== undefined,
    dataset: () => document.createElement('div').dataset !== undefined,
    contentEditable: () => 'contentEditable' in document.createElement('div'),
    shadowDOM: () => typeof document.createElement('div').attachShadow === 'function',
    customElements: () => typeof window.customElements !== 'undefined',
    mutationObserver: () => typeof window.MutationObserver !== 'undefined',
    intersectionObserver: () => typeof window.IntersectionObserver !== 'undefined',
    resizeObserver: () => typeof window.ResizeObserver !== 'undefined'
  },

  // Storage APIs
  storage: {
    localStorage: () => {
      try {
        return typeof window.localStorage !== 'undefined';
      } catch (e) { return false; }
    },
    sessionStorage: () => {
      try {
        return typeof window.sessionStorage !== 'undefined';
      } catch (e) { return false; }
    },
    indexedDB: () => typeof window.indexedDB !== 'undefined',
    cookies: () => navigator.cookieEnabled,
    cacheAPI: () => 'caches' in window,
    storageQuota: () => navigator.storage && typeof navigator.storage.estimate === 'function'
  },

  // Network APIs
  network: {
    fetch: () => typeof window.fetch === 'function',
    xhr: () => typeof XMLHttpRequest !== 'undefined',
    xhr2: () => {
      try {
        return 'responseType' in new XMLHttpRequest();
      } catch (e) { return false; }
    },
    websocket: () => typeof WebSocket !== 'undefined',
    webRTC: () => typeof RTCPeerConnection !== 'undefined',
    serverSentEvents: () => typeof EventSource !== 'undefined',
    beacon: () => typeof navigator.sendBeacon === 'function',
    streams: () => typeof ReadableStream !== 'undefined'
  },

  // Performance APIs
  performance: {
    performanceTiming: () => window.performance && typeof window.performance.timing !== 'undefined',
    performanceObserver: () => typeof PerformanceObserver !== 'undefined',
    navigationTiming: () => window.performance && typeof window.performance.getEntriesByType === 'function',
    userTiming: () => window.performance && typeof window.performance.mark === 'function',
    memoryInfo: () => window.performance && typeof window.performance.memory !== 'undefined',
    paintTiming: () => {
      try {
        return window.performance && window.performance.getEntriesByType('paint').length > 0;
      } catch (e) { return false; }
    }
  },

  // Media APIs
  media: {
    audio: () => typeof Audio !== 'undefined',
    video: () => !!document.createElement('video').canPlayType,
    webAudio: () => typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined',
    mediaRecorder: () => typeof MediaRecorder !== 'undefined',
    mediaDevices: () => navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function',
    pictureInPicture: () => 'pictureInPictureEnabled' in document,
    screenCapture: () => navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function'
  },

  // Graphics APIs
  graphics: {
    canvas: () => !!document.createElement('canvas').getContext,
    canvas2D: () => {
      try {
        return !!document.createElement('canvas').getContext('2d');
      } catch (e) { return false; }
    },
    webGL: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) { return false; }
    },
    webGL2: () => {
      try {
        return !!document.createElement('canvas').getContext('webgl2');
      } catch (e) { return false; }
    },
    webGPU: () => typeof navigator.gpu !== 'undefined',
    svg: () => document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'),
    offscreenCanvas: () => typeof OffscreenCanvas !== 'undefined'
  },

  // Worker APIs
  workers: {
    webWorker: () => typeof Worker !== 'undefined',
    sharedWorker: () => typeof SharedWorker !== 'undefined',
    serviceWorker: () => 'serviceWorker' in navigator,
    worklets: () => typeof CSS !== 'undefined' && typeof CSS.paintWorklet !== 'undefined'
  },

  // Security & Crypto
  security: {
    crypto: () => typeof window.crypto !== 'undefined',
    cryptoSubtle: () => window.crypto && typeof window.crypto.subtle !== 'undefined',
    randomValues: () => window.crypto && typeof window.crypto.getRandomValues === 'function',
    csp: () => {
      try {
        return document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null;
      } catch (e) { return false; }
    },
    subresourceIntegrity: () => {
      const link = document.createElement('link');
      return 'integrity' in link;
    }
  },

  // Device APIs
  device: {
    geolocation: () => 'geolocation' in navigator,
    battery: () => 'getBattery' in navigator,
    vibration: () => 'vibrate' in navigator,
    deviceMotion: () => 'DeviceMotionEvent' in window,
    deviceOrientation: () => 'DeviceOrientationEvent' in window,
    bluetooth: () => 'bluetooth' in navigator,
    usb: () => 'usb' in navigator,
    nfc: () => 'NDEFReader' in window,
    wakeLock: () => 'wakeLock' in navigator,
    gamepad: () => 'getGamepads' in navigator,
    sensors: {
      accelerometer: () => 'Accelerometer' in window,
      gyroscope: () => 'Gyroscope' in window,
      magnetometer: () => 'Magnetometer' in window,
      ambientLight: () => 'AmbientLightSensor' in window
    }
  },

  // Browser Features
  browser: {
    notifications: () => 'Notification' in window,
    pushAPI: () => 'PushManager' in window,
    permissions: () => 'permissions' in navigator,
    clipboard: () => 'clipboard' in navigator,
    share: () => 'share' in navigator,
    payment: () => 'PaymentRequest' in window,
    credentials: () => 'credentials' in navigator,
    webAuthn: () => 'PublicKeyCredential' in window,
    speechSynthesis: () => 'speechSynthesis' in window,
    speechRecognition: () => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    fullscreen: () => document.fullscreenEnabled || document.webkitFullscreenEnabled,
    pointerLock: () => 'pointerLockElement' in document || 'mozPointerLockElement' in document
  },

  // CSS Support
  css: {
    flexbox: () => {
      const el = document.createElement('div');
      return 'flex' in el.style || 'webkitFlex' in el.style;
    },
    grid: () => {
      const el = document.createElement('div');
      return 'grid' in el.style;
    },
    cssVariables: () => {
      return CSS && CSS.supports && CSS.supports('--test', '0');
    },
    animations: () => {
      const el = document.createElement('div');
      return 'animation' in el.style || 'webkitAnimation' in el.style;
    },
    transforms: () => {
      const el = document.createElement('div');
      return 'transform' in el.style || 'webkitTransform' in el.style;
    },
    transitions: () => {
      const el = document.createElement('div');
      return 'transition' in el.style;
    },
    containment: () => CSS && CSS.supports && CSS.supports('contain', 'layout'),
    scrollSnap: () => CSS && CSS.supports && CSS.supports('scroll-snap-type', 'x mandatory'),
    containerQueries: () => CSS && CSS.supports && CSS.supports('container-type', 'inline-size')
  }
};

// Execute all tests
export function detectAllFeatures() {
  const results = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints,
    features: {}
  };

  // Test all feature categories
  for (const [category, tests] of Object.entries(JS_FEATURE_TESTS)) {
    results.features[category] = {};

    if (typeof tests === 'function') {
      // Single test
      try {
        results.features[category] = tests() ? 'supported' : 'not-supported';
      } catch (e) {
        results.features[category] = 'error';
      }
    } else {
      // Multiple tests in category
      for (const [feature, test] of Object.entries(tests)) {
        if (typeof test === 'function') {
          try {
            results.features[category][feature] = test() ? 'supported' : 'not-supported';
          } catch (e) {
            results.features[category][feature] = 'error';
          }
        } else if (typeof test === 'object') {
          // Nested tests (like sensors)
          results.features[category][feature] = {};
          for (const [subFeature, subTest] of Object.entries(test)) {
            try {
              results.features[category][feature][subFeature] = subTest() ? 'supported' : 'not-supported';
            } catch (e) {
              results.features[category][feature][subFeature] = 'error';
            }
          }
        }
      }
    }
  }

  // Detect JavaScript engine
  results.jsEngine = detectJSEngine();

  // Calculate support percentages
  results.supportStats = calculateSupportStats(results.features);

  return results;
}

// Detect JavaScript engine
function detectJSEngine() {
  const ua = navigator.userAgent;

  if (typeof window.chrome !== 'undefined' && window.chrome.runtime) {
    return { name: 'V8', type: 'Chrome/Chromium' };
  } else if (ua.indexOf('Firefox') > -1) {
    return { name: 'SpiderMonkey', type: 'Firefox' };
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    return { name: 'JavaScriptCore', type: 'Safari/WebKit' };
  } else if (ua.indexOf('Edge') > -1) {
    return { name: 'V8', type: 'Edge' };
  } else if (ua.indexOf('Trident') > -1 || ua.indexOf('MSIE') > -1) {
    return { name: 'Chakra', type: 'Internet Explorer' };
  } else {
    return { name: 'Unknown', type: 'Unknown' };
  }
}

// Calculate support statistics
function calculateSupportStats(features) {
  let total = 0;
  let supported = 0;
  let notSupported = 0;
  let errors = 0;

  function countFeatures(obj) {
    for (const value of Object.values(obj)) {
      if (typeof value === 'string') {
        total++;
        if (value === 'supported') supported++;
        else if (value === 'not-supported') notSupported++;
        else if (value === 'error') errors++;
      } else if (typeof value === 'object') {
        countFeatures(value);
      }
    }
  }

  countFeatures(features);

  return {
    total,
    supported,
    notSupported,
    errors,
    supportPercentage: Math.round((supported / total) * 100),
    compatibility: supported >= total * 0.9 ? 'Excellent' :
                   supported >= total * 0.7 ? 'Good' :
                   supported >= total * 0.5 ? 'Fair' : 'Poor'
  };
}

// Send results to server
export async function updateRequestWithJSData(requestId, jsData) {
  try {
    const response = await fetch(`/api/update-js/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsData)
    });

    if (!response.ok) {
      throw new Error('Failed to update JS data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating JS data:', error);
    return null;
  }
}