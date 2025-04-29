import { Routes } from '@angular/router';
import { SnippingPageComponent } from './pages/Snipping/snipping.page';
import { AuthGuard } from '../service/Auth/AuthInterceptor';
import { HomePageComponent } from './pages/Home/home.page';
import { DocumentUploadComponent } from './pages/Document-Upload/document-upload.page';

const RootPageComponent = HomePageComponent;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RootPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'document-upload',
    component: DocumentUploadComponent,
    canActivate: [],
  },
  {
    path: 'snipping',
    component: SnippingPageComponent,
    canActivate: [],
  },
  {
    path: '**',
    component: RootPageComponent, // No 404 page, if the route doesnt exist, then go to root page
  },
];