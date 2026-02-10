import { Component, ElementRef, ViewChild, AfterViewInit, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Navbar } from "../../elements/navbar/navbar";
import { LetterComponent } from '../../elements/letter/letter';
import { Button } from "../../elements/button/button";
import { SocialLinks } from "../../elements/social-links/social-links";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [Navbar, LetterComponent, Button, SocialLinks, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit, OnDestroy {

  @ViewChild('headlineRoot', { static: true }) headlineRoot!: ElementRef;

  scale = 1;

  private resizeObserver!: ResizeObserver;
  private windowListener!: () => void;
  private rafId: number | null = null;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    // 1) Element-Resize beobachten
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleScaleUpdate();
    });
    this.resizeObserver.observe(this.headlineRoot.nativeElement);

    // 2) Fenster-Resize beobachten
    this.windowListener = () => this.scheduleScaleUpdate();
    window.addEventListener('resize', this.windowListener);

    // Initialer Aufruf
    this.scheduleScaleUpdate();
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
    window.removeEventListener('resize', this.windowListener);
  }

  private scheduleScaleUpdate() {
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.updateScale();
        this.rafId = null;
      });
    });
  }

  private updateScale() {
    const dvw = window.innerWidth;

    if (dvw < 421) {
      this.scale = 0.4;
    } else if (dvw < 769) {
      this.scale = 0.6;
    } else if (dvw < 1001) {
      this.scale = 0.8;
    } else {
      this.scale = 1;
    }

    this.cdr.markForCheck();
  }
}
