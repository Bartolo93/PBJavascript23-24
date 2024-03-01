import { Component } from '@angular/core';
import { NgxSnakeModule } from 'ngx-snake';

@Component({
  selector: 'app-snake-panel',
  standalone: true,
  imports: [NgxSnakeModule],
  templateUrl: './snake-panel.component.html',
  styleUrl: './snake-panel.component.scss',
})
export class SnakePanelComponent {}
