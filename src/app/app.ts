import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/main-sections/header/header";
import { AboutMe } from "./shared/components/main-sections/about-me/about-me";
import { Skills } from "./shared/components/main-sections/skills/skills";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AboutMe, Skills],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
