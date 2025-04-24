import { Routes } from '@angular/router';
import { SnippingPageComponent } from './pages/Snipping/snipping.page';
import { AuthGuard } from '../service/Auth/AuthInterceptor';
import { HomePageComponent } from './pages/Home/home.page';

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
    path: 'snipping',
    component: SnippingPageComponent,
    canActivate: [],
  },
  {
    path: '**',
    component: RootPageComponent, // No 404 page, if the route doesnt exist, then go to root page
  },
];