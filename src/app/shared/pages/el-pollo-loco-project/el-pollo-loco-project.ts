import { Component } from '@angular/core';
import { NavbarProjects } from '../../components/elements/navbar-projects/navbar-projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-el-pollo-loco-project',
  imports: [NavbarProjects, TranslateModule],
  templateUrl: './el-pollo-loco-project.html',
  styleUrl: './el-pollo-loco-project.scss',
})
export class ElPolloLocoProject {

}
