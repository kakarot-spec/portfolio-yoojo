import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  sectionIndexMap: { [key: string]: string } = {
    home: '01',
    about: '02',
    gallery: '03',
    contact: '04',
  };

  currentSectionId = 'home';
  activeIndex = 0;
  private scrollTimeout: any;
  private isBrowser: boolean;

  slidesData = [
    {
      title: 'Nightbus<br />Sessions',
      desc: 'Stripped-back live takes recorded on a moving bus, one city at a time. No overdubs, no click track — just wheels on asphalt and a condenser mic.',
      image: 'assets/project1.jpg',
    },
    {
      title: 'Starlight<br />Confessions',
      desc: 'An ambient exploration of acoustic space and vintage synth textures.',
      image: 'assets/project2.jpg',
    },
    {
      title: 'Static &<br />Restless Noise',
      desc: 'Overdriven guitar loops melting into lush orchestral strings.',
      image: 'assets/project3.jpg',
    },
  ];

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.handleScroll();
  }

  ngOnDestroy() {
    if (this.scrollTimeout && this.isBrowser) clearTimeout(this.scrollTimeout);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => this.handleScroll(), 100);
  }

  handleScroll() {
    if (!this.isBrowser) return;

    let currentSectionId = 'home';
    const sectionsArray = this.sections?.toArray() || [];
    sectionsArray.forEach((section) => {
      const top = section.nativeElement.offsetTop;
      const height = section.nativeElement.clientHeight;
      if (window.scrollY >= top - height / 2.5) {
        const id = section.nativeElement.getAttribute('id');
        if (id) currentSectionId = id;
      }
    });
    this.currentSectionId = currentSectionId;
  }

  scrollToAdjacentSection(direction: 'up' | 'down') {
    if (!this.isBrowser) return;
    const sectionsArray = this.sections?.toArray() || [];
    const currentScroll = window.scrollY;
    let targetSection: ElementRef | undefined;

    if (direction === 'down') {
      targetSection = sectionsArray.find((sec) => sec.nativeElement.offsetTop > currentScroll + 50);
    } else {
      const reversed = [...sectionsArray].reverse();
      targetSection = reversed.find((sec) => sec.nativeElement.offsetTop < currentScroll - 50);
    }

    if (targetSection) {
      targetSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- Slider Controls ---
  nextProject(): void {
    this.activeIndex = (this.activeIndex + 1) % this.slidesData.length;
  }

  prevProject(): void {
    this.activeIndex = (this.activeIndex - 1 + this.slidesData.length) % this.slidesData.length;
  }

  setProject(index: number): void {
    this.activeIndex = index;
  }
}
