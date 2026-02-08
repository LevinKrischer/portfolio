import { Component } from '@angular/core';
import { ContactMe } from '../../components/main-sections/contact-me/contact-me';
import { Thoughts } from '../../components/main-sections/thoughts/thoughts';
import { Projects } from '../../components/main-sections/projects/projects';
import { Skills } from '../../components/main-sections/skills/skills';
import { AboutMe } from '../../components/main-sections/about-me/about-me';
import { Header } from '../../components/main-sections/header/header';
import { MenueMobile } from "../../components/elements/menue-mobile/menue-mobile";

@Component({
  selector: 'app-main-page',
  imports: [Header, AboutMe, Skills, Projects, Thoughts, ContactMe, MenueMobile],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
