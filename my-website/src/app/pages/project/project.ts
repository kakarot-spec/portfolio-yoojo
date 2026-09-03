import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Project {
  num: string;
  tag: string;
  title: string;
  desc: string;
  gradient1: string;
  gradient2: string;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class ProjectComponent {
  projects: Project[] = [
    {
      num: '01',
      tag: 'LIVE SERIES',
      title: 'Nightbus Sessions',
      desc: 'Stripped-back live takes recorded on a moving bus, one city at a time. No overdubs, no click track — just wheels on asphalt and a condenser mic.',
      gradient1: "url('/assets/project1-left.jpg')",
      gradient2: "url('/assets/project1-right.jpg')",
    },
    {
      num: '02',
      tag: 'DEBUT EP • 2023',
      title: 'Static & Somewhere',
      desc: 'A five-track debut recorded in a converted garage, built around a single busted cassette deck. The title track was written the night the tape machine finally gave out.',
      gradient1: "url('/assets/project2-left.jpg')",
      gradient2: "url('/assets/project2-right.jpg')",
    },
    {
      num: '03',
      tag: 'MUSIC VIDEO',
      title: 'Paper Weather',
      desc: 'An impressionistic visual essay constructed from projection mappings and macro-lens film capture of dissolving structures under simulated weather.',
      gradient1: "url('/assets/project3-left.jpg')",
      gradient2: "url('/assets/project3-right.jpg')",
    },
    {
      num: '04',
      tag: 'TOUR VISUALS',
      title: 'Afterglow Tour',
      desc: 'A dynamic media library crafted for high-luminescence projections and active scene switching to sync with audio transient-shapers.',
      gradient1: "url('/assets/project4-left.jpg')",
      gradient2: "url('/assets/project4-right.jpg')",
    },
    {
      num: '05',
      tag: 'B-SIDES • 2022',
      title: 'Lost Tapes',
      desc: 'Unfinished, unfiltered arrangements rescued from archival hard drives, showcasing unpolished melodies and rough-cut voice memos.',
      gradient1: "url('/assets/project5-left.jpg')",
      gradient2: "url('/assets/project5-right.jpg')",
    },
    {
      num: '06',
      tag: 'SOLO DEMOS',
      title: 'Midnight Notes',
      desc: 'Late-night compositions stripped of grand production styles, celebrating minimalism with only a solo piano and soft tape hiss.',
      gradient1: 'linear-gradient(to left, #0e0e0e, #1c1c1c)',
      gradient2: 'linear-gradient(to top, #080808, #181818)',
    },
  ];

  // Start at index 1 (Project '02' active by default)
  activeIndex = 1;

  // This getter always returns the currently active project data
  get currentProject(): Project {
    return this.projects[this.activeIndex];
  }

  nextProject(): void {
    this.activeIndex = (this.activeIndex + 1) % this.projects.length;
  }

  prevProject(): void {
    this.activeIndex = (this.activeIndex - 1 + this.projects.length) % this.projects.length;
  }

  selectProject(index: number): void {
    this.activeIndex = index;
  }
}
