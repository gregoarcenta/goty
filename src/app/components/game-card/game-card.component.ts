import { Component, inject, input } from '@angular/core';
import { IGame } from '../../models/game.model';
import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [UpperCasePipe, NgOptimizedImage],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  game = input.required<IGame>();

  // services
  private gameService = inject(GameService);
  private toastrService = inject(ToastrService);

  disabledButton = false;
  async vote(game: IGame) {
    try {
      this.disabledButton = true;
      await this.gameService.voteGame(game.id);
      this.disabledButton = false;
      this.toastrService.success(`Haz votado por ${game.name}`, 'Genial!');
    } catch (error: any) {
      this.disabledButton = false;
      this.toastrService.error(error.message);
    }
  }
}
