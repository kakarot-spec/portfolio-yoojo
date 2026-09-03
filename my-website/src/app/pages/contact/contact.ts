import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule], // ✅ FormsModule enables ngModel
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
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

      // TODO: Replace this with actual API call or EmailJS integration
      // await this.contactService.sendMessage(this.formData);

      this.isSubmitted = true;
      form.resetForm();

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }
  }
}
