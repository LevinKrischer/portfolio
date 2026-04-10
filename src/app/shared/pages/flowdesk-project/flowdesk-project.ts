import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/elements/navbar/navbar';
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flowdesk-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile, RouterLink],
  templateUrl: './flowdesk-project.html',
  styleUrl: './flowdesk-project.scss',
})
export class FlowdeskProject {

}
