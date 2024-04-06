import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BarGraphComponent } from '../../components/bar-graph/bar-graph.component';
import { GameService } from '../../services/game.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BarGraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private gameService = inject(GameService);

  games = signal<any[]>([]);

  constructor() {
    this.gameService.games$
      .pipe(
        map((games) => {
          return games.map((game) => ({ name: game.name, value: game.votos }));
        }),
        takeUntilDestroyed()
      )
      .subscribe((games) => {
        this.games.set(games);
      });
  }
}
