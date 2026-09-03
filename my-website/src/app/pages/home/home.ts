import { Component, AfterViewInit, HostListener, ElementRef, ViewChild, ViewChildren, QueryList, OnDestroy, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  sectionIndexMap: { [key: string]: string } = {
    home: '01', about: '02', gallery: '03', contact: '04'
  };

  currentSectionId = 'home';
  activeIndex = 0;
  totalSlides = 3;
  private scrollTimeout: any;
  private isBrowser: boolean;

  slidesData = [
    { title: 'Nightbus<br />Sessions', desc: 'Stripped-back live takes recorded on a moving bus.', image: '/assets/project1.jpg' },
    { title: 'Starlight<br />Confessions', desc: 'An ambient exploration of acoustic space.', image: '/assets/project2.jpg' },
    { title: 'Static &<br />Restless Noise', desc: 'Overdriven guitar loops melting into orchestration.', image: '/assets/project3.jpg' }
  ];

  @ViewChildren('section') sections!: QueryList<ElementRef>;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  @ViewChild('pageIndicator') pageIndicator!: ElementRef;
  @ViewChild('upBtn') upBtn!: ElementRef;
  @ViewChild('downBtn') downBtn!: ElementRef;
  @ViewChild('projectPrevBtn') projectPrevBtn!: ElementRef;
  @ViewChild('projectNextBtn') projectNextBtn!: ElementRef;
  @ViewChildren('projectDot') projectDots!: QueryList<ElementRef>;
  @ViewChild('projectMedia') projectMedia!: ElementRef;
  @ViewChild('titleEl') titleEl!: ElementRef;
  @ViewChild('descEl') descEl!: ElementRef;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    // ✅ Only run browser-specific code if we're in the browser
    if (!this.isBrowser) return;
    
    this.handleScroll();
    this.setupArrowButtons();
    this.setupProjectSlider();
    this.updateProjectSlider(0);
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

    const navItemsArray = this.navItems?.toArray() || [];
    navItemsArray.forEach((item) => {
      const href = item.nativeElement.getAttribute('routerLink');
      if (href === `/${currentSectionId}` || href === `#${currentSectionId}`) {
        item.nativeElement.classList.add('active');
      } else {
        item.nativeElement.classList.remove('active');
      }
    });

    if (this.pageIndicator && this.sectionIndexMap[currentSectionId]) {
      this.pageIndicator.nativeElement.innerHTML = `${this.sectionIndexMap[currentSectionId]} <span>/ 04</span>`;
    }
  }

  setupArrowButtons() {
    if (!this.isBrowser || !this.upBtn || !this.downBtn) return;
    this.upBtn.nativeElement.addEventListener('click', () => this.scrollToAdjacentSection('up'));
    this.downBtn.nativeElement.addEventListener('click', () => this.scrollToAdjacentSection('down'));
  }

  scrollToAdjacentSection(direction: string) {
    if (!this.isBrowser) return;
    const sectionsArray = this.sections?.toArray() || [];
    const currentScroll = window.scrollY;
    let targetSection: any = null;
    if (direction === 'down') {
      targetSection = sectionsArray.find((sec) => sec.nativeElement.offsetTop > currentScroll + 50);
    } else if (direction === 'up') {
      const reversed = [...sectionsArray].reverse();
      targetSection = reversed.find((sec) => sec.nativeElement.offsetTop < currentScroll - 50);
    }
    if (targetSection) targetSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  setupProjectSlider() {
    if (!this.isBrowser) return;
    if (this.projectNextBtn) {
      this.projectNextBtn.nativeElement.addEventListener('click', () => {
        this.updateProjectSlider((this.activeIndex + 1) % this.totalSlides);
      });
    }
    if (this.projectPrevBtn) {
      this.projectPrevBtn.nativeElement.addEventListener('click', () => {
        this.updateProjectSlider((this.activeIndex - 1 + this.totalSlides) % this.totalSlides);
      });
    }
    const dotsArray = this.projectDots?.toArray() || [];
    dotsArray.forEach((dot, index) => {
      dot.nativeElement.addEventListener('click', () => this.updateProjectSlider(index));
    });
  }

  updateProjectSlider(index: number) {
    if (!this.isBrowser) return;
    this.activeIndex = index;
    if (this.titleEl && this.descEl) {
      this.titleEl.nativeElement.style.opacity = '0';
      this.descEl.nativeElement.style.opacity = '0';
      setTimeout(() => {
        this.titleEl.nativeElement.innerHTML = this.slidesData[this.activeIndex].title;
        this.descEl.nativeElement.textContent = this.slidesData[this.activeIndex].desc;
        this.titleEl.nativeElement.style.opacity = '1';
        this.descEl.nativeElement.style.opacity = '1';
      }, 150);
    }
    const dotsArray = this.projectDots?.toArray() || [];
    dotsArray.forEach((dot, idx) => {
      dot.nativeElement.classList.toggle('active', idx === this.activeIndex);
    });
    if (this.projectMedia) {
      const slide = this.slidesData[this.activeIndex];
      this.projectMedia.nativeElement.style.backgroundImage = `url('${slide.image}')`;
      this.projectMedia.nativeElement.style.backgroundSize = 'cover';
      this.projectMedia.nativeElement.style.backgroundPosition = 'center';
    }
  }
}