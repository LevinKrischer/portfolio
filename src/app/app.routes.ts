import { Routes } from '@angular/router';
import { MainPage } from './shared/pages/main-page/main-page';
import { PrivacyPolicy } from './shared/pages/privacy-policy/privacy-policy';
import { JoinProject } from './shared/pages/join-project/join-project';

export const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: 'join-project',
    component: JoinProject
  }

];
