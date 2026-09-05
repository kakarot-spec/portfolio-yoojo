import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface JournalEntry {
  id: string;
  title: string;
  month?: string;
  dayYear?: string;
  date?: string;
  story?: string;
  text?: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private platformId = inject(PLATFORM_ID);
  private STORAGE_KEY = 'yajoo_journal_entries';

  private defaultEntries: JournalEntry[] = [
    {
      id: '1',
      title: 'A day in Taipei',
      month: 'JUNE',
      dayYear: '04, 2025',
      date: 'JUNE 04, 2025',
      story:
        "Taipei is a city that blends the old and the new seamlessly. Every street tells a story, every corner holds a memory.\n\nFrom bustling markets to quiet alleys, there's beauty in the everyday life of this city.",
      text: "Taipei is a city that blends the old and the new seamlessly. Every street tells a story, every corner holds a memory.\n\nFrom bustling markets to quiet alleys, there's beauty in the everyday life of this city.",
      imageUrl:
        'https://images.unsplash.com/photo-1508233620467-f3199324e60d?w=800&auto=format&fit=crop',
    },
  ];

  private entriesSubject = new BehaviorSubject<JournalEntry[]>([]);
  public entries$: Observable<JournalEntry[]> = this.entriesSubject.asObservable();

  constructor() {
    const loaded = this.loadEntries();
    this.entriesSubject.next(loaded);
  }

  public getEntries(): JournalEntry[] {
    return this.entriesSubject.value;
  }

  public addEntry(entry: Omit<JournalEntry, 'id'>): JournalEntry {
    const current = this.getEntries();
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    const updated = [...current, newEntry];
    this.saveEntries(updated);
    return newEntry;
  }

  public updateEntry(id: string, updatedData: Partial<JournalEntry>): void {
    const current = this.getEntries();
    const index = current.findIndex((e) => e.id === id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = { ...updated[index], ...updatedData };
      this.saveEntries(updated);
    }
  }

  public deleteEntry(id: string): void {
    const updated = this.getEntries().filter((e) => e.id !== id);
    this.saveEntries(updated);
  }

  private loadEntries(): JournalEntry[] {
    // Guards against Node.js SSR execution where localStorage is undefined
    if (isPlatformBrowser(this.platformId)) {
      try {
        const data = window.localStorage.getItem(this.STORAGE_KEY);
        if (data) {
          return JSON.parse(data);
        } else {
          window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultEntries));
        }
      } catch (e) {
        console.error('Failed to read from localStorage:', e);
      }
    }
    return this.defaultEntries;
  }

  private saveEntries(entries: JournalEntry[]): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
      } catch (e) {
        console.error('Failed to write to localStorage:', e);
      }
    }
    this.entriesSubject.next(entries);
  }
}
