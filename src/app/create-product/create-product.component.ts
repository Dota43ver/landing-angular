import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IProduct } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product: IProduct = {
    id: 0,
    nombre: '',
    precio: 0,
    image: '',
  };

  isEditMode = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.apiService.getProduct(+productId).subscribe((product: IProduct) => {
        console.log('Producto obtenido:', product);
        this.product = product;
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit(): void {
    if (this.product.precio < 0 || this.product.precio > 10000) {
      alert('El precio debe ser un número entre 0 y 10,000.');
      return;
    }

    if (this.isEditMode && this.product.id !== 0) {
      this.apiService.putProduct(this.product).subscribe(
        (response: IProduct) => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      this.apiService.newProduct(this.product).subscribe(
        (response: IProduct) => {
          console.log('Producto creado:', response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }
}
