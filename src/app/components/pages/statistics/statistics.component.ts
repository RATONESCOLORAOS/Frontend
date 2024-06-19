import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../layout/header/header.module';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderModule],
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Lógica de inicialización si es necesario
  }
}
