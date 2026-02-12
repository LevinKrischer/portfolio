import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule, RouterLink],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

}
