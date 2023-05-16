/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directionality} from '@angular/cdk/bidi';
import {ChangeDetectorRef, Component, ElementRef, Inject, ViewEncapsulation} from '@angular/core';

import {DevAppDirectionality} from './dev-app-directionality';
import {DevAppRippleOptions} from './ripple-options';
import {DOCUMENT} from '@angular/common';

const isDarkThemeKey = 'ANGULAR_COMPONENTS_DEV_APP_DARK_THEME';

export const ANIMATIONS_STORAGE_KEY = 'ANGULAR_COMPONENTS_ANIMATIONS_DISABLED';

/** Root component for the dev-app demos. */
@Component({
  selector: 'dev-app-layout',
  templateUrl: 'dev-app-layout.html',
  styleUrls: ['dev-app-layout.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DevAppLayout {
  readonly darkThemeClass = 'demo-unicorn-dark-theme';
  _isDark = false;
  strongFocus = false;
  navItems = [
    {name: 'Autocomplete', route: '/autocomplete'},
    {name: 'Badge', route: '/badge'},
    {name: 'Bottom sheet', route: '/bottom-sheet'},
    {name: 'Button Toggle', route: '/button-toggle'},
    {name: 'Button', route: '/button'},
    {name: 'Card', route: '/card'},
    {name: 'Checkbox', route: '/checkbox'},
    {name: 'Chips', route: '/chips'},
    {name: 'Clipboard', route: '/clipboard'},
    {name: 'Column Resize', route: 'column-resize'},
    {name: 'Connected Overlay', route: '/connected-overlay'},
    {name: 'Datepicker', route: '/datepicker'},
    {name: 'Dialog', route: '/dialog'},
    {name: 'Drawer', route: '/drawer'},
    {name: 'Drag and Drop', route: '/drag-drop'},
    {name: 'Expansion Panel', route: '/expansion'},
    {name: 'Focus Origin', route: '/focus-origin'},
    {name: 'Focus Trap', route: '/focus-trap'},
    {name: 'Grid List', route: '/grid-list'},
    {name: 'Icon', route: '/icon'},
    {name: 'Input', route: '/input'},
    {name: 'Input Modality', route: '/input-modality'},
    {name: 'List', route: '/list'},
    {name: 'Layout', route: '/layout'},
    {name: 'Live Announcer', route: '/live-announcer'},
    {name: 'Menu', route: '/menu'},
    {name: 'Paginator', route: '/paginator'},
    {name: 'Platform', route: '/platform'},
    {name: 'Popover Edit', route: '/popover-edit'},
    {name: 'Portal', route: '/portal'},
    {name: 'Progress Bar', route: '/progress-bar'},
    {name: 'Progress Spinner', route: '/progress-spinner'},
    {name: 'Radio', route: '/radio'},
    {name: 'Ripple', route: '/ripple'},
    {name: 'Screen Type', route: '/screen-type'},
    {name: 'Select', route: '/select'},
    {name: 'Sidenav', route: '/sidenav'},
    {name: 'Slide Toggle', route: '/slide-toggle'},
    {name: 'Slider', route: '/slider'},
    {name: 'Snack Bar', route: '/snack-bar'},
    {name: 'Stepper', route: '/stepper'},
    {name: 'Table', route: '/table'},
    {name: 'Tabs', route: '/tabs'},
    {name: 'Toolbar', route: '/toolbar'},
    {name: 'Tooltip', route: '/tooltip'},
    {name: 'Tree', route: '/tree'},
    {name: 'Typography', route: '/typography'},
    {name: 'Virtual Scrolling', route: '/virtual-scroll'},
  ];

  /** Currently selected density scale based on the index. */
  currentDensityIndex = 0;

  /** List of possible global density scale values. */
  densityScales = [0, -1, -2, 'minimum', 'maximum'];

  /** Whether animations are disabled. */
  animationsDisabled = localStorage.getItem(ANIMATIONS_STORAGE_KEY) === 'true';

  constructor(
    private _element: ElementRef<HTMLElement>,
    public rippleOptions: DevAppRippleOptions,
    @Inject(Directionality) public dir: DevAppDirectionality,
    cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    dir.change.subscribe(() => cdr.markForCheck());
    try {
      const s = this._document.createElement('link');
      s.rel = 'stylesheet';
      s.href = 'light-theme.css';
      const head: any = this._document.querySelector('head');
      head.appendChild(s);
      const isDark = localStorage.getItem(isDarkThemeKey);
      if (isDark != null) {
        // We avoid calling the setter and apply the themes directly here.
        // This avoids writing the same value, that we just read, back to localStorage.
        this._isDark = isDark === 'true';
        this.updateThemeClass(this._isDark);
      }
    } catch (error) {
      console.error(`Failed to read ${isDarkThemeKey} from localStorage: `, error);
    }
  }

  get isDark(): boolean {
    return this._isDark;
  }

  set isDark(value: boolean) {
    // Noop if the value is the same as is already set.
    if (value !== this._isDark) {
      this._isDark = value;
      this.updateThemeClass(this._isDark);

      try {
        localStorage.setItem(isDarkThemeKey, String(value));
      } catch (error) {
        console.error(`Failed to write ${isDarkThemeKey} to localStorage: `, error);
      }
    }
  }

  toggleFullscreen() {
    // Cast to `any`, because the typings don't include the browser-prefixed methods.
    const elem = this._element.nativeElement.querySelector('.demo-content') as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  updateThemeClass(isDark?: boolean) {
    if (isDark) {
      // this._document.body.classList.add(this.darkThemeClass);
      this.appendTheme('dark-theme.css');  
    } else {
      // this._document.body.classList.remove(this.darkThemeClass);
      this.appendTheme('light-theme.css');
    }
  }

  public appendTheme(name: string) {
    const s = this._document.createElement('link');
    s.rel = 'stylesheet';
    s.href = name;
    const head: any = this._document.querySelector('head');
    head.appendChild(s);
  }

  toggleStrongFocus() {
    const strongFocusClass = 'demo-strong-focus';

    this.strongFocus = !this.strongFocus;

    if (this.strongFocus) {
      this._document.body.classList.add(strongFocusClass);
    } else {
      this._document.body.classList.remove(strongFocusClass);
    }
  }

  toggleAnimations() {
    localStorage.setItem(ANIMATIONS_STORAGE_KEY, !this.animationsDisabled + '');
    location.reload();
  }

  /** Gets the index of the next density scale that can be selected. */
  getNextDensityIndex() {
    return (this.currentDensityIndex + 1) % this.densityScales.length;
  }

  /** Selects the next possible density scale. */
  selectNextDensity() {
    this.currentDensityIndex = this.getNextDensityIndex();
  }

  /**
   * Updates the density classes on the host element. Applies a unique class for
   * a given density scale, so that the density styles are conditionally applied.
   */
  getDensityClass() {
    return `demo-density-${this.densityScales[this.currentDensityIndex]}`;
  }
}
