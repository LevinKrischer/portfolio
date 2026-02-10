import { Component } from '@angular/core';
import { PeelOff } from "../../elements/peel-off/peel-off";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [PeelOff, TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {

}
