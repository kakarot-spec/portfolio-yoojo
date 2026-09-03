import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { GalleryComponent } from './pages/gallery/gallery';
import { ContactComponent } from './pages/contact/contact';
import { LiveComponent } from './pages/live/live'; //
import { ProjectComponent } from './pages/project/project';
import { LoginComponent } from './pages/login/login';
import { AdminComponent } from './pages/admin/admin';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'live', component: LiveComponent },
  { path: 'project', component: ProjectComponent },

  // New Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }, // Protected!

  { path: '**', redirectTo: '' },
];
