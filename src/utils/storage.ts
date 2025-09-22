import type { HeaderEntry } from '../types';

const MAX_ENTRIES = 1000;
const STORAGE_KEY = 'header-entries';

export class HeaderStorage {
  private entries: HeaderEntry[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  add(entry: HeaderEntry): void {
    this.entries.unshift(entry);
    if (this.entries.length > MAX_ENTRIES) {
      this.entries = this.entries.slice(0, MAX_ENTRIES);
    }
    this.saveToLocalStorage();
  }

  getAll(): HeaderEntry[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries = [];
    this.saveToLocalStorage();
  }

  getById(id: string): HeaderEntry | undefined {
    return this.entries.find(e => e.id === id);
  }

  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.entries = JSON.parse(stored) as HeaderEntry[];
      }
    } catch {
      this.entries = [];
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
  }
}