import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../layout/header/header.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderModule],
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  mapUrl: SafeResourceUrl;
  supermarkets: { name: string }[] = [
    { name: 'Supermercado 1' },
    { name: 'Supermercado 2' },
    { name: 'Supermercado 3' },
    { name: 'Supermercado 4' },
    { name: 'Supermercado 5' },
  ];

  constructor(private sanitizer: DomSanitizer) {
    // Reemplaza el valor del src con el enlace al mapa de Granada con menos zoom
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50714.10012614207!2d-3.6203499!3d37.1773363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcaef2d20539%3A0x91e986d3ddc9ec1a!2sGranada!5e0!3m2!1ses!2ses!4v1654004181821!5m2!1ses!2ses');
  }

  ngOnInit(): void {}
}
