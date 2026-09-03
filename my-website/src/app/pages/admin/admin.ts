import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule], // Required for [(ngModel)]
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  cardData = {
    title: '',
    description: '',
    imageUrl: '',
  };

  selectedImagePreview: string | null = null;
  saveSuccess = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImagePreview = URL.createObjectURL(file);
      this.cardData.imageUrl = file.name;
    }
  }

  deleteImage(): void {
    this.selectedImagePreview = null;
    this.cardData.imageUrl = '';
    const input = document.getElementById('imageInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  saveChanges(): void {
    if (!this.cardData.title || !this.cardData.description) {
      alert('Please fill in both title and description.');
      return;
    }

    console.log('Saving data:', this.cardData);
    this.saveSuccess = true;

    setTimeout(() => {
      this.saveSuccess = false;
    }, 3000);
  }
}
