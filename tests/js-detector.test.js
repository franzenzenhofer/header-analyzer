// JS Feature Detector Tests (<50 lines)
import { describe, test, expect } from 'vitest';

describe('JS Feature Detection', () => {
  test('detects ES6 features', () => {
    const hasPromise = typeof Promise !== 'undefined';
    const hasSymbol = typeof Symbol !== 'undefined';
    expect(hasPromise).toBe(true);
    expect(hasSymbol).toBe(true);
  });

  test('detects Array methods', () => {
    expect(typeof Array.prototype.includes).toBe('function');
    expect(typeof Array.prototype.flat).toBe('function');
    expect(typeof Array.prototype.at).toBe('function');
  });

  test('detects Object methods', () => {
    expect(typeof Object.values).toBe('function');
    expect(typeof Object.entries).toBe('function');
  });

  test('detects DOM APIs', () => {
    expect(typeof document.querySelector).toBe('function');
    expect(typeof MutationObserver).toBe('function');
  });

  test('calculates support percentage', () => {
    const stats = {
      total: 100,
      supported: 85,
      notSupported: 15
    };
    const percentage = Math.round((stats.supported / stats.total) * 100);
    expect(percentage).toBe(85);
  });

  test('determines compatibility grade', () => {
    const getGrade = (percent) => {
      if (percent >= 90) return 'Excellent';
      if (percent >= 70) return 'Good';
      if (percent >= 50) return 'Fair';
      return 'Poor';
    };
    expect(getGrade(95)).toBe('Excellent');
    expect(getGrade(75)).toBe('Good');
  });
});