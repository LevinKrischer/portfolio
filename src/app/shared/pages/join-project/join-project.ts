import { Component } from '@angular/core';
import { NavbarProjects } from '../../components/elements/navbar-projects/navbar-projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-join-project',
  imports: [NavbarProjects, TranslateModule],
  templateUrl: './join-project.html',
  styleUrl: './join-project.scss',
})
export class JoinProject {

}
