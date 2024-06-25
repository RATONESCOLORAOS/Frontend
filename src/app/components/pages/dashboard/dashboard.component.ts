import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ListService } from '../../../services/list.service';
import { ProductService } from '../../../services/product.service';
import { SupermarketService } from '../../../services/supermarket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderModule } from '../../layout/header/header.module';
import { ComparativaComponent } from '../comparativa/comparativa.component';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderModule, ComparativaComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  newListName: string = '';
  userLists: any[] = [];
  selectedList: any | null = null;
  categories: string[] = [
    'Fruta y verduras',
    'Bebidas con alcohol',
    'Huevos',
    'Conservas, caldos y cremas',
    'Cereales y galletas',
    'Marisco y pescado',
    'Congelados',
    'Bebidas sin alcohol',
    'Leche y yogures',
    'Higiene',
    'Frutos secos',
    'Zumos',
    'Pizzas y platos preparados',
    'Panadería y pastelería',
    'Mantequilla',
    'Limpieza',
    'Miel, caramelos y chocolate',
    'Charcutería y quesos',
    'Carne',
    'Mascota',
    'Aceite, vinagre, especias y salsas',
    'Refrescos',
    'Arroz legumbres y pasta',
    'Café e infusiones',
    'Agua',
  ];
  products: {
    id?: number;
    cartId: number;
    productName: string;
    quantity: number;
    marca: string;
    categoria: string;
    toRemove?: boolean;
  }[] = [];

  diaTotalPrice: number = 0;
  mercadonaTotalPrice: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private listService: ListService,
    private productService: ProductService,
    private supermarketService: SupermarketService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.loadUserLists(user.id);
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUserLists(userId: number) {
    this.listService.getUserLists(userId).subscribe(
      (lists: any[]) => {
        this.userLists = lists;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading user lists', error);
      }
    );
  }

  createList() {
    if (this.newListName.trim() !== '') {
      const user = this.userService.getCurrentUser();
      if (user) {
        this.listService.createList(this.newListName, user.id).subscribe(
          () => {
            console.log(
              `List "${this.newListName}" created and saved successfully.`
            );
            this.loadUserLists(user.id);
            this.newListName = '';
          },
          (error: HttpErrorResponse) => {
            console.error('Error creating list', error);
          }
        );
      }
    } else {
      console.log('Enter a list name');
    }
  }

  selectList(list: any) {
    console.log('Selected list:', list);
    this.selectedList = list;
    if (list && list.id) {
      this.loadProducts(list.id);
    } else {
      console.error('Selected list does not have a valid id');
    }
  }

  loadProducts(cartId: number) {
    this.productService.getProductsByCartId(cartId).subscribe(
      (products: any[]) => {
        this.products = products;
        this.getTotalPrices(cartId); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading products', error);
      }
    );
  }

  getTotalPrices(cartId: number) {
    this.supermarketService.getTotalPriceForCart(cartId).subscribe(
      (response: any) => {
        console.log('Total prices for cart: ', response);
        this.diaTotalPrice = response.diaTotalPrice;
        this.mercadonaTotalPrice = response.mercadonaTotalPrice;

        
        console.log('diaProducts: ', response.diaProducts);
        console.log('mercadonaProducts: ', response.mercadonaProducts);

        this.selectedList.diaProducts = response.diaProducts.map(
          (product: any) => ({
            producto: product.product.producto, 
            marca: product.product.marca,
            formato: product.product.formato,
            cantidad: product.quantity,
            totalPriceForProduct: product.totalPriceForProduct,
          })
        );

        this.selectedList.mercadonaProducts = response.mercadonaProducts.map(
          (product: any) => ({
            producto: product.product.producto, 
            marca: product.product.marca,
            formato: product.product.formato,
            cantidad: product.quantity,
            totalPriceForProduct: product.totalPriceForProduct,
          })
        );
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching total prices', error);
      }
    );
  }

  addProductRow() {
    if (this.selectedList) {
      this.products.push({
        cartId: this.selectedList.id,
        productName: '',
        quantity: 0,
        marca: '',
        categoria: '',
      });
    } else {
      console.log('No list selected');
    }
  }

  removeProductRow(index: number) {
    this.products.splice(index, 1);
  }

  deleteProduct(productId: number, index: number) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.products.splice(index, 1);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting product', error);
      }
    );
  }

  deleteList(list: any) {
    if (list) {
      this.listService.deleteList(list.id).subscribe(
        () => {
          console.log('List deleted successfully');
          const user = this.userService.getCurrentUser();
          if (user) {
            this.loadUserLists(user.id);
          }
          if (this.selectedList && this.selectedList.id === list.id) {
            this.selectedList = null;
            this.products = [];
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting list', error);
        }
      );
    } else {
      console.log('No list selected');
    }
  }

  saveProducts() {
    if (this.selectedList) {
      const updateRequest = {
        cartName: this.selectedList.name,
        productsToAdd: this.products
          .filter((p) => !p.id)
          .map((p) => ({
            productName: p.productName,
            marca: p.marca,
            quantity: p.quantity,
            categoria: p.categoria,
          })),
        productsToRemove: this.products
          .filter((p) => p.id && p.toRemove)
          .map((p) => p.id),
      };

      this.listService
        .updateList(this.selectedList.id, updateRequest)
        .subscribe(
          () => {
            console.log('Products saved successfully');
            this.loadProducts(this.selectedList.id);
          },
          (error: HttpErrorResponse) => {
            console.error('Error saving products', error);
          }
        );
    } else {
      console.log('No list selected');
    }
  }

  navigateToComparativa() {
    if (this.selectedList && this.selectedList.id) {
      this.router.navigate(['/comparativa', this.selectedList.id]);
    } else {
      console.log('No list selected');
    }
  }

  updateProduct(product: any) {
    if (this.selectedList) {
      this.productService.updateProduct(product.id, product).subscribe(
        () => {
          console.log('Product updated successfully');
          this.loadProducts(this.selectedList.id);
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  exitList() {
    this.selectedList = null;
    this.products = [];
    console.log('Has salido de la lista');
  }
}
