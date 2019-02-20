import { Directive, HostListener } from '@angular/core';
import { PATTERNS } from '@app/constants/patterns';

/**
* backspace: ASCII 8
* tab: ASCII 9
* enter: ASCII 13
* left arrow: ASCII 37
* up arrow: ASCII 38
* right arrow: ASCII 39
* down arrow: ASCII 40
* delete: ASCII 46
*/
const ALLOWED_KEYS = [8, 9, 13, 37, 38, 39, 40, 46];

export function isNumber(e: KeyboardEvent): boolean {
  return PATTERNS.number.test(e.key);
}
@Directive({
  selector: '[inputColor]'
})
export class InputColorDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  public ValidateEvent(event): void {
    if (!PATTERNS.hexa.test(event.key) && !ALLOWED_KEYS.includes(event.keyCode)) {
      event.preventDefault();
    } else {
      if (event.srcElement.value.length >= 6 && !ALLOWED_KEYS.includes(event.keyCode)) {
        event.preventDefault();
      }
    }
  }

}

@Directive({
  selector: '[inputString]'
})
export class InputStringDirective {

  public constructor() { }

  @HostListener('keydown', ['$event'])
  public ValidateEvent(event) {
    if (PATTERNS.string.test(event.key)) {
      if (event.target.value.length > 49) {
        event.preventDefault();
      }
    } else if (!ALLOWED_KEYS.includes(event.keyCode)) {
      event.preventDefault();
    }
  }

}

@Directive({
  selector: '[inputNumber]'
})
export class InputNumberDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  public ValidateEvent(event) {
    if (!isNumber(event)) {
      if (!ALLOWED_KEYS.includes(event.keyCode)) {
        event.preventDefault();
      }
    }
  }

}

