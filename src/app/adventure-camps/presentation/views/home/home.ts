import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampsStore } from '../../../application/adventure-camps.store';
import { AdventureCampSummary } from '../../components/adventure-camp-summary/adventure-camp-summary';

/** Displays all camps and their reservation and capacity totals. */
@Component({
  standalone: true,
  imports: [AdventureCampSummary, MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly store = inject(AdventureCampsStore);

  constructor() {
    this.store.load();
  }
}
