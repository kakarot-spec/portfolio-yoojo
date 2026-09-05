import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavbarComponent {
  @Input() currentSectionId: string = 'home';
  @Input() sectionIndexMap: Record<string, string> = {
    home: '01',
    about: '02',
    project: '03',
    gallery: '04',
  };
  @Output() scrollDirection = new EventEmitter<'up' | 'down'>();

  onScroll(direction: 'up' | 'down'): void {
    this.scrollDirection.emit(direction);
  }

  scrollToAdjacentSection(direction: 'up' | 'down'): void {
    this.scrollDirection.emit(direction);
  }
}
