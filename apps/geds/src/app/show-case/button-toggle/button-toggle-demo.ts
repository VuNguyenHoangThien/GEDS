/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component} from '@angular/core';

@Component({
  selector: 'button-toggle-demo',
  templateUrl: 'button-toggle-demo.html',
  styleUrls: ['button-toggle-demo.scss'],
})
export class ButtonToggleDemo {
  isVertical = false;
  isDisabled = false;
  favoritePie = 'Apple';
  pieOptions = ['Apple', 'Cherry', 'Pecan', 'Lemon'];
}
