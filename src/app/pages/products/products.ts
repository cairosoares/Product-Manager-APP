import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductModalComponent } from '../products-modals/products-modal';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, ProductModalComponent, ToastModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})

export class Products implements OnInit {
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];
  filterForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
  });
  modalOpen = false;
  selectedProduct: IProductResponse | null = null;
  
  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response;
      },
    })
  }

  filterProducts() {
    const title = this.filterForm.value.title?.toLowerCase();
    const category = this.filterForm.value.category?.toLowerCase();

    this.filteredProducts = this.products.filter((product) => 
      (!title || product.title.toLowerCase().includes(title)) &&
      (!category || product.category.toLowerCase().includes(category))
    );
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.get('category')?.setValue('');

    this.filteredProducts = this.products;
  }


  openModal(product?: IProductResponse) {
    this.selectedProduct = product ?? null;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleSave(product: IProductResponse) {
    console.log('Produto salvo:', product);
    this.modalOpen = false;
  }
}
