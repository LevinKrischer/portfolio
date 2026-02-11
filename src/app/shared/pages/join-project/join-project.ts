import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-join-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile, RouterLink],
  templateUrl: './join-project.html',
  styleUrl: './join-project.scss',
})
export class JoinProject {

}
