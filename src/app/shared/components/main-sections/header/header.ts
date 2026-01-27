import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Navbar } from "../../elements/navbar/navbar";
import { LetterComponent } from '../../elements/letter/letter';
import { LETTERS } from '../../elements/letter/letter.data';
import { Button } from "../../elements/button/button";
import { SocialLinks } from "../../elements/social-links/social-links";

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
    // const total = this.calculateTotalWidth();

    this.scale = Math.min(1, available);
  }

  // private calculateTotalWidth(): number {
  //   const text = 'Frontend DEVELOPER';
  //   return text
  //     .split('')
  //     .map(c => LETTERS[c.toLowerCase()].upper.width)
  //     .reduce((a, b) => a + b, 0);
  // }
}
