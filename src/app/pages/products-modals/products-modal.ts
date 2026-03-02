import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProductResponse } from '../../interfaces/product-response';
import { ProductsService } from '../../services/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'
import { take } from 'rxjs';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { IUpdateProductRequest } from '../../interfaces/update-product-request';

@Component({
  selector: 'app-products-modal',
  imports: [ReactiveFormsModule],
  templateUrl: '/products-modal.html',
  styleUrl: './products-modal.css'
})
export class ProductModalComponent {
  @Input() isOpen = false;
  @Input() product?: IProductResponse | null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<IProductResponse>();

  private readonly _productsService = inject(ProductsService);
  private readonly _messageService = inject(MessageService);

  modalForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
    id: new FormControl(0, [Validators.required])
  });

  ngOnChanges() {
    if (this.product) {
      this.modalForm.patchValue(this.product);
    } else {
      this.modalForm.reset({ price: 0, stock: 0 });
    }
  }

  onClose() {
    this.close.emit();
  }

  onDelete(){  
        const id = this.modalForm.value.id;

        if (!id) return;

        this._productsService.deleteProduct(id);
        this._messageService.add({ severity: 'success', summary: 'sucesso', detail: 'Produto removido com sucesso!' });
        this.onClose();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        
  }

  onSave() {
    if (this.modalForm.invalid) return;
    
    const updateProduct: IUpdateProductRequest = {
          id: this.modalForm.value.id as number,
          title: this.modalForm.value.title as string,
          description: this.modalForm.value.description as string,
          price: this.modalForm.value.price as number,
          category: this.modalForm.value.category as string,
          stock: this.modalForm.value.stock as number,
    };

    this._productsService.updateProducts(updateProduct).pipe(take(1)).subscribe({
          next: (response) => {
            this._messageService.add({ severity: 'success', summary: 'sucesso', detail: 'Produto removido com sucesso!' });
            this.onClose();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
        },
    });
    
  }
}