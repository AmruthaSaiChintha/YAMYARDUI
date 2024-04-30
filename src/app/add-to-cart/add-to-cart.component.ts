import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  cartItems: any[] = [];
  totalprice:number=0;
  private totalpricekey='totalprice';
  amountvalue:number=0;
  totalamountvalue:number=0;
  quantityvalue:number=0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getcartItems();
    this.price();
    this.TotalAmount();
    this.TotalQuantity();
  }

  increaseQuantity(item: any) {
    
    item.quantity++;
    this.price();
   this.totalamountvalue=this.TotalAmount();
   this.TotalQuantity();
   
   
  }
  price()
  {
    this.totalprice = 0;
    this.cartItems.forEach(item => {
      item.totalprice = item.price * item.quantity; 
      this.totalprice += item.totalprice; 
      sessionStorage.setItem(this.totalpricekey,JSON.stringify(this.totalprice));
    });
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.price();
      this.totalamountvalue=this.TotalAmount();
      this.TotalQuantity();

    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    sessionStorage.clear();
  }
  TotalQuantity()
  {
    let quantityvalue=0;
    this.cartItems.forEach(item=>
      {
        quantityvalue+=item.quantity;
      })
  this.quantityvalue=quantityvalue;

  }
  TotalAmount()
  {
    let amountvalue=0;
    this.cartItems.forEach(item=>
      {
        amountvalue+=item.price*item.quantity;
      })
      this.totalamountvalue=amountvalue;
      return amountvalue;
  }
}

