import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphComponent {
  results = input.required<any[]>();
  // results = signal([
  //   {
  //     name: 'Juego 1',
  //     value: 20,
  //   },
  //   {
  //     name: 'Juego 2',
  //     value: 40,
  //   },
  //   {
  //     name: 'Juego 3',
  //     value: 60,
  //   },
  // ]);

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  legendTitle = 'Juegos'
  legendPosition = LegendPosition.Below
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  // colorScheme = 'nightLights';
  // colorScheme = 'vivid';

  constructor() {}

  onSelect(event: Event) {
    console.log(event);
  }
}
