import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  standalone: true,
})
export class Button {
  @Output() clicked = new EventEmitter<void>();
  @Input() disabled = false;

  /**
   * Emits the click event when the button is enabled.
   */
   onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
