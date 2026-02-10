import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';

@Component({
  selector: 'app-join-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile],
  templateUrl: './join-project.html',
  styleUrl: './join-project.scss',
})
export class JoinProject {

}
