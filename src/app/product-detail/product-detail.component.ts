import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;
  loading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params) => {
        this._apiService.getProduct(params['productId']).subscribe({
          next: (data: IProduct) => {
            this.product = data;
            console.log(this.product);
            this.loading = false;
          },
          error: (error: any) => {
            console.log(error);
            this.loading = false;
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  onDelete(): void {
    if (this.product) {
      this._apiService.deleteProduct(this.product.id).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this._router.navigate(['/products']); // Redirige a la lista de productos
        },
        error: (error: any) => {
          console.error('Error al eliminar el producto:', error);
        },
      });
    }
  }
}
