import { Component } from '@angular/core';
import { NavbarProjects } from '../../components/elements/navbar-projects/navbar-projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-da-bubble-project',
  imports: [NavbarProjects, TranslateModule],
  templateUrl: './da-bubble-project.html',
  styleUrl: './da-bubble-project.scss',
})
export class DaBubbleProject {

}
