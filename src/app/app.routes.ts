import { Routes } from '@angular/router';
import { MainPage } from './shared/pages/main-page/main-page';
import { JoinProject } from './shared/pages/join-project/join-project';
import { ElPolloLocoProject } from './shared/pages/el-pollo-loco-project/el-pollo-loco-project';
import { LegalNotice } from './shared/pages/legal-notice/legal-notice';

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
    path: 'join-project',
    component: JoinProject
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
