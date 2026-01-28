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

  hidePeel() {
    this.peelClick.nativeElement.classList.add('toBeHidden');
    this.setHidden();
  }

  setHidden() {
    setTimeout(() => {
      this.peelClick.nativeElement.classList.add('hidden');
      this.peelLayer.nativeElement.classList.add('hidden');
    }, 450);
  }

}
