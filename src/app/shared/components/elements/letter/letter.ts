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

  private _char = signal<string>('');
  private _scale = signal<number>(1);
  private config = LETTERS;
  private isInitialUpper = computed(() => {
    const c = this._char();
    return c === c.toUpperCase() && c !== c.toLowerCase();
  });
  currentSrc = computed(() => this.variant()?.src ?? '');
  currentWidth = computed(() => this.variant()?.width ?? 0);
  @Input() set char(value: string) {
    this._char.set(value);
  }
  @Input() set scale(value: number) {
    this._scale.set(value);
  }

  private _hover = signal<boolean>(false);

  onHover(isHover: boolean) {
    this._hover.set(isHover);
  }

  variant = computed(() => {
    const c = this._char();
    const data = this.config[c];
    if (!data) return null;
    const hover = this._hover();
    const initialUpper = this.isInitialUpper();
    const showUpper = initialUpper ? !hover : hover;
    return showUpper ? data.upper : data.lower;
  });


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
