import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../layout/header/header.module';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { LatLngExpression } from 'leaflet';
import markerIconBlue from '@assets/images/marker-icon-blue.png';
import markerIconRed from '@assets/images/marker-icon-red.png';
import markerShadow from '@assets/images/marker-shadow.png';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderModule],
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  supermarkets: { name: string }[] = [
    { name: 'Mercadona: 0.67 km' },
    { name: 'Mercadona: 1.10 km' },
    { name: 'Dia:  1.13 km' },
    { name: 'Dia:  1.35 km' },
   
  ];

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const camaraCoords: LatLngExpression = [
      37.19485595431825, -3.614422844079135,
    ];
    const diaCoords: LatLngExpression[] = [
      [37.19415016714708, -3.6261697783198277],
      [37.1889879040908, -3.6197753924396228],
      [37.18604764950951, -3.611836054266214],
      [37.19992738075206, -3.605055430312708],
      [37.20184162619881, -3.6172433872924272],
    ];
    const mercadonaCoords: LatLngExpression[] = [
      [37.198661693413946, -3.612222294926504],
      [37.1881664879288, -3.622736553588586],
      [37.19096991036286, -3.610849003999211],
      [37.18645703292715, -3.6028238351428468],
      [37.19406230109244, -3.6381812287013204],
    ];

    const map = L.map('mapid').setView(camaraCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const redIcon = new L.Icon({
      iconUrl: markerIconRed,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const blueIcon = new L.Icon({
      iconUrl: markerIconBlue,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker(camaraCoords, { icon: redIcon })
      .addTo(map)
      .bindPopup('Cámara de Comercio');

    diaCoords.forEach((coords) => {
      L.marker(coords, { icon: blueIcon })
        .addTo(map)
        .bindPopup('Supermercado DIA');
    });

    mercadonaCoords.forEach((coords) => {
      L.marker(coords, { icon: blueIcon })
        .addTo(map)
        .bindPopup('Supermercado Mercadona');
    });

    function addRoute(
      map: L.Map,
      start: LatLngExpression,
      end: LatLngExpression,
      label: string
    ): void {
      const routingControl = (L as any).Routing.control({
        waypoints: [L.latLng(start), L.latLng(end)],
        createMarker: () => null,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 3 }],
        },
        router: new (L as any).Routing.OSRMv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1/',
        }),
        plan: (L as any).Routing.plan([L.latLng(start), L.latLng(end)], {
          createMarker: () => null,
          show: false,
          addWaypoints: false,
        }),
      })
        .on('routesfound', function (e: any) {
          const distance = e.routes[0].summary.totalDistance / 1000;
          const popupContent = `${label}: ${distance.toFixed(2)} км`;

          const marker = L.marker(end, { icon: blueIcon }).addTo(map);
          marker.bindPopup(popupContent);

          L.polyline(e.routes[0].coordinates, {
            color: 'blue',
            weight: 3,
            opacity: 0.7,
            lineJoin: 'round',
          }).addTo(map);
        })
        .addTo(map);
      routingControl._container.style.display = 'None';
    }

    diaCoords.forEach((coords, index) => {
      addRoute(map, camaraCoords, coords, 'DIA ' + (index + 1));
    });

    mercadonaCoords.forEach((coords, index) => {
      addRoute(map, camaraCoords, coords, 'Mercadona ' + (index + 1));
    });
  }
}
