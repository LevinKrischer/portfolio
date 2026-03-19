import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-peel-off',
  imports: [],
  templateUrl: './peel-off.html',
  styleUrl: './peel-off.scss',
})

export class PeelOff {
  @ViewChild('peelClick') peelClick!: ElementRef;
  @ViewChild('peelLayer') peelLayer!: ElementRef;
  @ViewChild('peelLayerMobile') peelLayerMobile!: ElementRef;

  /**
   * Starts the peel-off hide animation flow.
   */
   hidePeel() {
    this.peelClick.nativeElement.classList.add('toBeHidden');
    this.setHidden();
  }

  /**
   * Marks peel-off elements as hidden after the animation delay.
   */
   setHidden() {
    setTimeout(() => {
      this.peelClick.nativeElement.classList.add('hidden');
      this.peelLayer.nativeElement.classList.add('hidden');
      this.peelLayerMobile.nativeElement.classList.add('hidden');
    }, 450);
  }
}
