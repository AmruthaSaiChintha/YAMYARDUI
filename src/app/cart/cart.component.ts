import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  totalamount:number=0;
  finalamount:number=0;
  totalquantity:number=0;

  constructor(private cartService: CartService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
    });
    this.cartItems = this.cartService.getcartItems();
    this.totalamount=this.cartService.gettingtotalamout();
  }
  
 
  
  remove(item: any): void 
  {
    this.cartService.removefromcart(item);
    this.cartItems = this.cartService.getcartItems();
    this.totalamount=this.cartService.gettingtotalamout();
    
  
  }

  addMoreQuantity(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity++;
      this.cartService.cartiems = this.cartItems;
      this.updatesubtotal();
      
    }
  }


  updatesubtotal():void
  {

    this.totalamount=this.cartItems.reduce((total,item)=>total+(item.price*item.quantity), 0);
    this.totalquantity=this.cartItems.reduce((total,item)=>total+item.quantity,0);
  




  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.price/=2;
      this.cartService.cartiems = this.cartItems;
      this.updatesubtotal();
    
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    item.price*=2;
    this.cartService.cartiems = this.cartItems;
    this.updatesubtotal();
 
  }
}
