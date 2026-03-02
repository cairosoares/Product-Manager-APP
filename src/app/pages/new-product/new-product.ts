import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successMessage = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    productCode: new FormControl(0, [Validators.required]),
    stock: new FormControl(0, [Validators.required])
  });

  private readonly _productsService = inject(ProductsService);
  private readonly _messageService = inject(MessageService);

  saveProduct() {
    console.log('productForm', this.productForm);

    if(this.productForm.invalid) return;

    const newProduct: INewProductRequest = {
      title: this.productForm.value.title as string,
      description: this.productForm.value.description as string,
      price: this.productForm.value.price as number,
      category: this.productForm.value.category as string,
      productCode: this.productForm.value.productCode as number,
      stock: this.productForm.value.stock as number,
    };

    this._productsService.saveProduct(newProduct).pipe(take(1)).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'sucesso', detail: 'Produto removido com sucesso!' });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
      },
    });
  }
}
