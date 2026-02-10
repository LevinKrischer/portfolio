import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';

@Component({
  selector: 'app-da-bubble-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile],
  templateUrl: './da-bubble-project.html',
  styleUrl: './da-bubble-project.scss',
})
export class DaBubbleProject {

}
