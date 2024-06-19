import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SupermarketService } from '../../../services/supermarket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../layout/header/header.module';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listId: number | null = null;
  diaTotalPrice: number = 0;
  mercadonaTotalPrice: number = 0;
  selectedList: any = { diaProducts: [], mercadonaProducts: [] };
  products: {
    productName: any;
    cantidad: any;
    categoria: any;
    quantity: any;
    marca: any;
    supermercado: any;
  }[] = [];
supermarkets: any;
mapUrl: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private supermarketService: SupermarketService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listId = Number(params.get('id'));
      if (this.listId) {
        this.loadTotalPricesAndProducts(this.listId);
      }
    });
  }

  loadTotalPricesAndProducts(cartId: number) {
    this.supermarketService.getTotalPriceForCart(cartId).subscribe(
      (response: any) => {
        this.diaTotalPrice = response.diaTotalPrice;
        this.mercadonaTotalPrice = response.mercadonaTotalPrice;
        this.selectedList.diaProducts = response.diaProducts.map(
          (product: any) => ({
            productName: product.product.producto,
            cantidad: product.product.cantidad,
            categoria: product.product.categoria,
            quantity: product.quantity,
            marca: product.product.marca,
            formato: product.product.formato,
            totalPriceForProduct: product.totalPriceForProduct,
            supermercado: product.product.supermercado,
          })
        );
        this.selectedList.mercadonaProducts = response.mercadonaProducts.map(
          (product: any) => ({
            productName: product.product.producto,
            cantidad: product.product.cantidad,
            categoria: product.product.categoria,
            quantity: product.quantity,
            marca: product.product.marca,
            formato: product.product.formato,
            totalPriceForProduct: product.totalPriceForProduct,
            supermercado: product.product.supermercado,
          })
        );
      },
      (error: HttpErrorResponse) => {
        console.error('Error getting total prices and products', error);
      }
    );
  }
}
