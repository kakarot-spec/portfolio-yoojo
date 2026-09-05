import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../../components/nav-bar/nav-bar';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NavbarComponent], // Removed unused RouterLink & RouterLinkActive
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  // Required bindings for NavbarComponent
  currentSectionId = 'contact';
  sectionIndexMap: Record<string, string> = {
    home: '01',
    about: '02',
    project: '03',
    gallery: '04',
    contact: '05',
  };

  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitted = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form Submitted:', this.formData);

      this.isSubmitted = true;
      form.resetForm();

      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }
  }

  // Handler for (scrollDirection) event emitted by NavbarComponent
  scrollToAdjacentSection(direction: 'up' | 'down'): void {
    console.log(`Scroll action triggered: ${direction}`);
  }
}
