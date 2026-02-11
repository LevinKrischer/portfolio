import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-el-pollo-loco-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile, RouterLink],
  templateUrl: './el-pollo-loco-project.html',
  styleUrl: './el-pollo-loco-project.scss',
})
export class ElPolloLocoProject {

}
