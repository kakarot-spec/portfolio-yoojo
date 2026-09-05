import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JournalService, JournalEntry } from '../../services/journal.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit, OnDestroy {
  private journalService = inject(JournalService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private sub?: Subscription;

  // Authentication State
  isAuthenticated: boolean = false;
  passwordInput: string = '';
  authError: boolean = false;

  // Search State
  searchTerm: string = '';

  // UI / Modal Controls
  isModalOpen: boolean = false;
  saveSuccess: boolean = false;
  isDragging: boolean = false;

  // Data State
  entries: JournalEntry[] = [];
  editId: string | null = null;

  // Form Fields
  formMonth = '';
  formDayYear = '';
  formTitle = '';
  formStory = '';
  formImageUrl = '';
  selectedImagePreview: string | null = null;

  // Filter entries based on search bar input
  get filteredEntries(): JournalEntry[] {
    if (!this.searchTerm.trim()) {
      return this.entries;
    }
    return this.entries.filter((e) =>
      e.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      if (!loggedIn) {
        this.router.navigate(['/login']);
        return;
      }
      this.isAuthenticated = true;
    }

    this.sub = this.journalService.entries$.subscribe((entries: JournalEntry[]) => {
      this.entries = entries;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  login(): void {
    if (this.passwordInput === 'admin123') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isAdminLoggedIn', 'true');
      }
      this.isAuthenticated = true;
      this.authError = false;
      this.passwordInput = '';
    } else {
      this.authError = true;
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAdminLoggedIn');
    }
    this.router.navigate(['/login']);
  }

  openAddModal(): void {
    this.resetForm();
    this.isModalOpen = true;
  }

  openEditModal(item: JournalEntry): void {
    this.editEntry(item);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  // File Upload Handling
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  // Drag and Drop Handling
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.processFile(file);
      } else {
        alert('Please drop an image file.');
      }
    }
  }

  private processFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;

      this.compressImage(base64Data, 800, 800, 0.7)
        .then((compressedBase64) => {
          this.selectedImagePreview = compressedBase64;
          this.formImageUrl = compressedBase64;
        })
        .catch((err) => {
          console.error('Image compression failed:', err);
          this.selectedImagePreview = base64Data;
          this.formImageUrl = base64Data;
        });
    };
    reader.readAsDataURL(file);
  }

  private compressImage(
    base64Str: string,
    maxWidth: number = 800,
    maxHeight: number = 800,
    quality: number = 0.7,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Str;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = (error) => reject(error);
    });
  }

  deleteImage(): void {
    this.selectedImagePreview = null;
    this.formImageUrl = '';
    const input = document.getElementById('imageInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  editEntry(item: JournalEntry): void {
    this.editId = item.id;
    this.formMonth = item.month || '';
    this.formDayYear = item.dayYear || '';
    this.formTitle = item.title || '';
    this.formStory = item.story || item.text || '';
    this.formImageUrl = item.imageUrl || '';
    this.selectedImagePreview = item.imageUrl || null;
  }

  saveChanges(): void {
    if (!this.formTitle || (!this.formStory && !this.formMonth)) {
      alert('Please fill in both title and content.');
      return;
    }

    const entryData = {
      month: this.formMonth,
      dayYear: this.formDayYear,
      date: `${this.formMonth} ${this.formDayYear}`.trim(),
      title: this.formTitle,
      story: this.formStory,
      text: this.formStory,
      imageUrl:
        this.formImageUrl || 'https://images.unsplash.com/photo-1508233620467-f3199324e60d?w=800',
    };

    if (this.editId) {
      this.journalService.updateEntry(this.editId, entryData);
    } else {
      this.journalService.addEntry(entryData);
    }

    this.saveSuccess = true;
    this.isModalOpen = false;
    this.resetForm();

    setTimeout(() => {
      this.saveSuccess = false;
    }, 3000);
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.journalService.deleteEntry(id);
      if (this.editId === id) {
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.editId = null;
    this.formMonth = '';
    this.formDayYear = '';
    this.formTitle = '';
    this.formStory = '';
    this.formImageUrl = '';
    this.isDragging = false;
    this.deleteImage();
  }
}
