import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LETTERS, LetterConfig } from './letter.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter.html',
  styleUrls: ['./letter.scss']
})
export class LetterComponent implements OnChanges {
  @Input() char!: string;
  @Input() scale = 1;

  currentOffset = 0;
  currentSrc!: string;
  currentWidth!: number;
  private isInitialUpper = true;

  private config: Record<string, LetterConfig> = LETTERS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['char'] && this.char) {
      const data = this.config[this.char];

      if (!data) {
        console.warn(`No letter config found for "${this.char}"`);
        return;
      }

      const isUpper = this.char === this.char.toUpperCase() && this.char !== this.char.toLowerCase();
      this.isInitialUpper = isUpper;

      const initialVariant = isUpper ? data.upper : data.lower;
      this.currentSrc = initialVariant.src;
      this.currentWidth = initialVariant.width;

      // 🔥 Nur das kleine p bekommt einen Offset
      this.currentOffset = this.char === 'p' ? 12 : 0;
    }
  }

  onHover(isHover: boolean): void {
    const data = this.config[this.char];
    if (!data) return;

    const showUpper = this.isInitialUpper ? !isHover : isHover;
    const target = showUpper ? data.upper : data.lower;

    this.currentSrc = target.src;
    this.currentWidth = target.width;

    // 🔥 Wenn wir auf das kleine p wechseln → Offset aktivieren
    if (this.char === 'p') {
      this.currentOffset = showUpper ? 0 : 12;
    } else {
      this.currentOffset = 0;
    }
  }
}
