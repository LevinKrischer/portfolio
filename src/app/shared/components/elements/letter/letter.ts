import { Component, Input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { LETTERS } from './letter.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter.html',
  styleUrls: ['./letter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetterComponent {

  // Inputs als Signals
  private _char = signal<string>('');
  private _scale = signal<number>(1);

  @Input() set char(value: string) {
    this._char.set(value);
  }

  @Input() set scale(value: number) {
    this._scale.set(value);
  }

  // Hover-Signal
  private _hover = signal<boolean>(false);

  // Hover-Handler
  onHover(isHover: boolean) {
    this._hover.set(isHover);
  }

  // Letter-Daten
  private config = LETTERS;

  // Initialzustand: ist der Input-Buchstabe uppercase?
  private isInitialUpper = computed(() => {
    const c = this._char();
    return c === c.toUpperCase() && c !== c.toLowerCase();
  });

  // Variante abhängig von Hover + Initialzustand
  variant = computed(() => {
    const c = this._char();
    const data = this.config[c];
    if (!data) return null;

    const hover = this._hover();
    const initialUpper = this.isInitialUpper();

    // Logik aus deinem alten Code:
    // Wenn initial Upper → bei Hover Lower
    // Wenn initial Lower → bei Hover Upper
    const showUpper = initialUpper ? !hover : hover;

    return showUpper ? data.upper : data.lower;
  });

  currentSrc = computed(() => this.variant()?.src ?? '');
  currentWidth = computed(() => this.variant()?.width ?? 0);

  currentOffset = computed(() => {
    const c = this._char();
    const hover = this._hover();
    const initialUpper = this.isInitialUpper();

    // p hat Sonderoffset
    if (c !== 'p') return 0;

    const showUpper = initialUpper ? !hover : hover;
    return showUpper ? 0 : 12;
  });

  char$ = computed(() => this._char());
  scale$ = computed(() => this._scale());
}
