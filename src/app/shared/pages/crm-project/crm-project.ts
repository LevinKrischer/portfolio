import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/elements/navbar/navbar';
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crm-project',
  imports: [Navbar, TranslateModule, Navbar, MenueMobile, RouterLink],
  templateUrl: './crm-project.html',
  styleUrl: './crm-project.scss',
})

export class CrmProject { }
