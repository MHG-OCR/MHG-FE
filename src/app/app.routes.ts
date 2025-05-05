import { Routes } from '@angular/router';
import { SnippingPageComponent } from './pages/Snipping/snipping.page';
// import { AuthGuard } from '../service/Auth/AuthInterceptor';
import { HomePageComponent } from './pages/Home/home.page';
import { DocumentUploadComponent } from './pages/Document-Upload/document-upload.page';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LandingViewComponent } from './pages/landing-view/landing-view.component';

const RootPageComponent = HomePageComponent;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingViewComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'document-upload',
    component: DocumentUploadComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'snipping',
    component: SnippingPageComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: '**',
    component: RootPageComponent, // No 404 page, if the route doesn't exist, then go to root page
  },
];
