import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl =
    'https://java-spring-angular-production.up.railway.app/productos';

  constructor(private _httpClient: HttpClient) {}

  public getAllProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.baseUrl);
  }

  public getProduct(id: number | string): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  public newProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient.post<IProduct>(`${this.baseUrl}`, product);
  }

  public putProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient.put<IProduct>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }

  public deleteProduct(id: number | string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
