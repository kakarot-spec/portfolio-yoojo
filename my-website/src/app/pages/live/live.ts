import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../components/nav-bar/nav-bar';
import { JournalService, JournalEntry } from '../../services/journal.service';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './live.html',
  styleUrl: './live.css',
})
export class LiveComponent implements OnInit, OnDestroy {
  private journalService = inject(JournalService);
  private sub?: Subscription;

  currentSectionId: string = 'live';
  sectionIndexMap: Record<string, string> = {};

  entries: JournalEntry[] = [];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.sub = this.journalService.entries$.subscribe((entries: JournalEntry[]) => {
      this.entries = entries;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // FIXED: 1 entry added in admin = 1 full spread (Left image + Right text)
  get totalSpreads(): number {
    return Math.max(this.entries.length, 1);
  }

  get isFirstSpread(): boolean {
    return this.currentIndex === 0;
  }

  get isLastSpread(): boolean {
    return this.currentIndex >= this.totalSpreads - 1;
  }

  // Template Navigation Handler matching (click)="navigatePage(...)"
  navigatePage(direction: number): void {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.totalSpreads) {
      this.currentIndex = newIndex;
    }
  }

  // Legacy support just in case other buttons use them
  nextPage(): void {
    this.navigatePage(1);
  }

  prevPage(): void {
    this.navigatePage(-1);
  }

  // Number formatting helper required by template
  formatNum(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  get currentEntry(): JournalEntry | null {
    if (this.entries.length === 0 || this.currentIndex >= this.entries.length) {
      return null;
    }
    return this.entries[this.currentIndex];
  }

  get entryDate(): string {
    const entry = this.currentEntry;
    if (!entry) return '';
    if (entry.date) return entry.date;
    if (entry.month || entry.dayYear) return `${entry.month || ''} ${entry.dayYear || ''}`.trim();
    return '';
  }

  get entryText(): string {
    const entry = this.currentEntry;
    if (!entry) return '';
    return entry.story || entry.text || '';
  }

  get leftPageNumber(): string {
    const num = this.currentIndex * 2 + 1;
    return this.formatNum(num);
  }

  get rightPageNumber(): string {
    const num = this.currentIndex * 2 + 2;
    return this.formatNum(num);
  }

  get totalPagesFormatted(): string {
    const total = Math.max(this.entries.length * 2, 2);
    return this.formatNum(total);
  }

  scrollToAdjacentSection(direction: any): void {
    if (direction === 'next') {
      this.navigatePage(1);
    } else if (direction === 'prev') {
      this.navigatePage(-1);
    }
  }
}
