import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-goty',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, GameCardComponent],
  templateUrl: './goty.component.html',
  styleUrl: './goty.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GotyComponent {
  private gameService = inject(GameService);

  get games$() {
    return this.gameService.games$;
  }

  constructor() {}
}
