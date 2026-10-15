import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly translate = inject(TranslateService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(result => result.matches)),
    { initialValue: true },
  );

  constructor() {
    this.translate.addLangs(['en', 'es']);
  }

  switchLanguage(language: 'en' | 'es'): void {
    this.translate.use(language);
  }
}
