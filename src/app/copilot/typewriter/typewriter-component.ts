// typewriter.component.ts
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  template: `<span>{{ displayedText }}</span>`
})
export class TypewriterComponent implements OnChanges {
  @Input() text = '';
  @Input() speed = 20; // ms per character

  displayedText = '';
  private index = 0;

  ngOnChanges() {
    this.displayedText = '';
    this.index = 0;
    this.typeNext();
  }

  typeNext() {
    if (this.index < this.text.length) {
      this.displayedText += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeNext(), this.speed);
    }
  }
}
