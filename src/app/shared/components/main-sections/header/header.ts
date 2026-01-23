import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Navbar } from "../../navbar/navbar";
import { LetterComponent } from '../../letter/letter';
import { LETTERS } from '../../letter/letter.data';
import { Button } from "../../button/button";
import { SocialLinks } from "../../social-links/social-links";

@Component({
  selector: 'app-header',
  imports: [Navbar, LetterComponent, Button, SocialLinks],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {

  @ViewChild('headlineRoot', { static: true }) headlineRoot!: ElementRef;

  scale = 1;

  ngAfterViewInit() {
    const observer = new ResizeObserver(() => this.updateScale());
    observer.observe(this.headlineRoot.nativeElement);

    this.updateScale();
  }

  private updateScale() {
    const available = this.headlineRoot.nativeElement.clientWidth;
    const total = this.calculateTotalWidth();

    this.scale = Math.min(1, available / total);
  }

  private calculateTotalWidth(): number {
    const text = 'frontenddeveloper';
    return text
      .split('')
      .map(c => LETTERS[c.toLowerCase()].upper.width)
      .reduce((a, b) => a + b, 0);
  }
}
