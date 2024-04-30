import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalamountvalue:number=0;
  lengthcalculator:number=0;
  subtotal:number=0;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getcartItems().map(item => ({ ...item }));
    // this.totalamountvalue = this.cartService.gettingtotalamout();
    this.cartItems.forEach(item => {
      if (item.quantity === undefined || item.quantity === null || item.quantity <= 0) {
        item.quantity = 1;
      }
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    item.price=item.price*item.quantity;
    // this.totalamountvalue=this.incresesubtotal();
    
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.price=item.price/(item.quantity+1);
      // this.totalamountvalue=this.incresesubtotal();
    }
  }
  incresesubtotal()
  {
    
    let value=0;
    this.cartItems.forEach(element => {
      value=value+element.price;

      
    });
    return value;
    
  }

  removeItem(item: any) {
    this.cartService.removefromcart(item);
    this.cartItems = this.cartService.getcartItems();
  }
}
