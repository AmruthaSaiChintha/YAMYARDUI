import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getcartItems();
  }

  remove(item: any): void {
    this.cartService.removefromcart(item);
    this.cartItems = this.cartService.getcartItems();
  }

  addMoreQuantity(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity++;
      this.cartService.cartiems = this.cartItems;
    }
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.cartiems = this.cartItems;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.cartService.cartiems = this.cartItems;
  }
}
