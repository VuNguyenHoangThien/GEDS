/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component} from '@angular/core';

@Component({
  selector: 'badge-demo',
  templateUrl: 'badge-demo.html',
  styleUrls: ['badge-demo.scss'],
})
export class BadgeDemo {
  visible = true;
  badgeContent = '0';
}
