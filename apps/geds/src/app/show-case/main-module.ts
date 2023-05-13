/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DEV_APP_ROUTES} from './routes';


@NgModule({
  imports: [
    // BrowserAnimationsModule.withConfig({
    //   disableAnimations: localStorage.getItem(ANIMATIONS_STORAGE_KEY) === 'true',
    // }),
    // DevAppModule,
    HttpClientModule,
    RouterModule.forChild(DEV_APP_ROUTES)
  ],
  providers: [],
})
export class MainModule {}
