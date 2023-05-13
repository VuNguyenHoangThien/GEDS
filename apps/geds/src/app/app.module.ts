import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {RouterModule, Routes} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ANIMATIONS_STORAGE_KEY, DevAppLayout } from './show-case/dev-app/dev-app-layout';
import {Directionality} from '@angular/cdk/bidi';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';
import {MAT_RIPPLE_GLOBAL_OPTIONS} from '@angular/material/core';
import { DevAppRippleOptions } from './show-case/dev-app/ripple-options';
import { DevAppDirectionality } from './show-case/dev-app/dev-app-directionality';

const ROUTER: Routes = [{
  path: '',
  loadChildren: () => import('./show-case/main-module').then(m => m.MainModule),
}]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DevAppLayout],
  imports: [BrowserModule, 
    BrowserAnimationsModule.withConfig({
      disableAnimations: localStorage.getItem(ANIMATIONS_STORAGE_KEY) === 'true'
    }),
    ReactiveFormsModule,  
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(ROUTER)],
  providers: [DevAppLayout,
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: DevAppRippleOptions},
    {provide: Directionality, useClass: DevAppDirectionality},],
  bootstrap: [AppComponent]
})
export class AppModule {}
