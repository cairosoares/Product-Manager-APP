import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INewProductRequest } from '../interfaces/new-product-request';
import { INewProductResponse } from '../interfaces/new-product-response';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { IProductResponse } from '../interfaces/product-response';
import { IUpdateProductRequest } from '../interfaces/update-product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);

  saveProduct(product: INewProductRequest): Observable<INewProductResponse> {
    return this._httpClient.post<INewProductResponse>('http://localhost:5048/api/produtos', product);
  }

  async deleteProduct(id: number): Promise<string> {
    return await lastValueFrom(this._httpClient.delete<string>(`http://localhost:5048/api/produtos/${id}`));
  }

  getProducts(): Observable<IProductResponse[]> {
    return this._httpClient.get<IProductResponse[]>('http://localhost:5048/api/produtos');
  }

  updateProducts(product: IUpdateProductRequest): Observable<void> {
    return this._httpClient.patch<void>(`http://localhost:5048/api/produtos/${product.id}`, product);
  }
}
