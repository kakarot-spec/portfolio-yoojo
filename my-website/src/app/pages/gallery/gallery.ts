import { Component, HostListener } from '@angular/core'; // ✅ Correct import
import { RouterLink, RouterLinkActive } from '@angular/router';

interface GalleryItem {
  id: number;
  num: string;
  title: string;
  images: string[];
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent {
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      num: '01',
      title: 'SOUNDCHECK,<br />BEFORE DOORS',
      images: ['/assets/pic1-a.jpg', '/assets/pic1-b.jpg', '/assets/pic1-c.jpg'],
    },
    {
      id: 2,
      num: '02',
      title: 'BETWEEN TAKES',
      images: ['/assets/pic1-a.jpg', '/assets/pic2-b.jpg', '/assets/pic2-c.jpg'],
    },
    {
      id: 3,
      num: '03',
      title: 'BACKLINE,<br />DAY ONE',
      images: ['/assets/pic3-a.jpg', '/assets/pic1-b.jpg', '/assets/pic3-c.jpg'],
    },
    {
      id: 4,
      num: '04',
      title: 'LAST LIGHT,<br />LOAD-OUT',
      images: ['/assets/pic4-a.jpg', '/assets/pic1-b.jpg', '/assets/pic4-c.jpg'],
    },
    {
      id: 5,
      num: '05',
      title: 'WRITING<br />SESSIONS',
      images: ['/assets/pic1-a.jpg', '/assets/pic5-b.jpg', '/assets/pic5-c.jpg'],
    },
    {
      id: 6,
      num: '06',
      title: 'SILENCE<br />IN-BETWEEN',
      images: ['/assets/pic1-a.jpg', '/assets/pic6-b.jpg', '/assets/pic6-c.jpg'],
    },
    {
      id: 7,
      num: '07',
      title: 'MIDNIGHT<br />IDEAS',
      images: ['/assets/pic1-a.jpg', '/assets/pic7-b.jpg', '/assets/pic7-c.jpg'],
    },
    {
      id: 8,
      num: '08',
      title: 'FADE OUT,<br />STAY TRUE',
      images: ['/assets/pic1-a.jpg', '/assets/pic8-b.jpg', '/assets/pic8-c.jpg'],
    },
  ];

  activeIndexes: Record<number, number> = {};

  constructor() {
    this.galleryItems.forEach((item) => {
      this.activeIndexes[item.id] = 0;
    });
  }

  getImage(cardId: number, offset: number): string {
    const item = this.galleryItems.find((i) => i.id === cardId);
    if (!item) return '';
    const idx = this.activeIndexes[cardId] || 0;
    return item.images[(idx + offset) % 3];
  }

  cycleCard(cardId: number): void {
    const current = this.activeIndexes[cardId] || 0;
    this.activeIndexes[cardId] = (current + 1) % 3;
  }

  // ✅ Correct usage of @HostListener with document: prefix
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const deck = target.closest('.deck-container');

    if (!deck) return;

    const rect = deck.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const frame = deck.querySelector('.front-card-frame') as HTMLElement;
    const backLeft = deck.querySelector('.card-tilt-left') as HTMLElement;
    const backRight = deck.querySelector('.card-tilt-right') as HTMLElement;

    if (frame) {
      frame.style.transition = 'none';
      frame.style.transform = `perspective(800px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.03)`;
    }
    if (backLeft) {
      backLeft.style.transition = 'none';
      backLeft.style.transform = `rotate(-5deg) translate(${x * -12}px, ${y * -12}px)`;
    }
    if (backRight) {
      backRight.style.transition = 'none';
      backRight.style.transform = `rotate(5deg) translate(${x * 12}px, ${y * 12}px)`;
    }
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const deck = target.closest('.deck-container');

    if (!deck) return;

    const frame = deck.querySelector('.front-card-frame') as HTMLElement;
    const backLeft = deck.querySelector('.card-tilt-left') as HTMLElement;
    const backRight = deck.querySelector('.card-tilt-right') as HTMLElement;

    const resetTransforms = (el: HTMLElement | null, transform: string) => {
      if (el) {
        el.style.transition = 'transform 0.4s ease';
        el.style.transform = transform;
      }
    };

    resetTransforms(frame, 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
    resetTransforms(backLeft, 'rotate(-3.5deg) translate(0px, 0px)');
    resetTransforms(backRight, 'rotate(3.5deg) translate(0px, 0px)');
  }
}
