import { Routes } from '@angular/router';
import { MainPage } from './shared/pages/main-page/main-page';
import { JoinProject } from './shared/pages/join-project/join-project';
import { ElPolloLocoProject } from './shared/pages/el-pollo-loco-project/el-pollo-loco-project';
import { LegalNotice } from './shared/pages/legal-notice/legal-notice';
import { DaBubbleProject } from './shared/pages/da-bubble-project/da-bubble-project';
import { PrivacyPolicy } from './shared/pages/privacy-policy/privacy-policy';

export const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'legal-notice',
    component: LegalNotice
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: 'join-project',
    component: JoinProject
  },
  {
    path: 'dabubble-project',
    component: DaBubbleProject
  },
  {
    path: 'el-pollo-loco-project',
    component: ElPolloLocoProject
  },
  {
    path: 'el-pollo-loco-project',
    component: ElPolloLocoProject
  }
];
