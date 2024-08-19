import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsList: IProduct[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe((data: IProduct[]) => {
      this.productsList = data;
    });
  }

  onDelete(id: number): void {
    this.apiService.deleteProduct(id).subscribe(
      (response: string) => {
        console.log(response); // Aquí puedes manejar la respuesta si lo deseas
        this.productsList = this.productsList.filter(
          (product: IProduct) => product.id !== id
        );
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
