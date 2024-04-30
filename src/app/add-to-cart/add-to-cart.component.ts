import { Component, OnInit,ChangeDetectorRef, IterableDiffers} from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  removeAllClicked: boolean = true;
  checkoutvalue:number=0;
  checkvalue:boolean=false;
  orderdata:any;
  private checkoutsesssion="checkvalue"

  private orderurl="https://localhost:44387/api/Orders"

  constructor(private cartService: CartService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    const orderdatasession=sessionStorage.getItem('orderdata');
    if(orderdatasession)
    {
      const orderdata=JSON.parse('orderdatasession');
      
      this.postorder(orderdata)
    }
    this.cartItems = this.cartService.getcartItems();
    this.price();
    this.TotalAmount();
    this.TotalQuantity();
    this.carrybag();
  
  }

  increaseQuantity(item: any) {

  item.quantity++;
  this.price();
   this.totalamountvalue=this.TotalAmount();
   this.TotalQuantity();
   this.cartService.savecartitems();
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
      this.cartService.savecartitems();
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

  removeallItems() {

    this.removeAllClicked = false; 
    this.cartItems = []; 
    this.TotalAmount(); 
    this.TotalQuantity(); 
    sessionStorage.clear(); 
  
  }
  checkcartempty()
  {
    if(this.cartItems.length==0)
    {
      this.removeAllClicked=false;
    }
  }
  carrybag()
  {
    console.log(this.checkvalue);
    if(this.checkvalue==true)
    {
      this.checkoutvalue=this.totalprice+6;
      sessionStorage.setItem(this.checkoutsesssion,JSON.stringify(this.checkoutvalue));
    }
    
    
    else{
      this.checkoutvalue=this.totalprice;
    }
  }
  navigate() {
   
    const orderdata = {
      UserId: 1, 
      Items: this.cartItems.map(item => ({
        CartItemId: item.cartItemId,
        Description: item.description,
        Name: item.name,
        Price: item.price,
        Quantity: item.quantity
      })),
      CheckoutValue: this.checkoutvalue
    };
    console.log(orderdata)
  
   
    this.postorder(orderdata);
  
   
    this.router.navigateByUrl("/payment");
  }
  
  
  postorder(orderdata: any) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    this.http.post(this.orderurl, orderdata, { headers }).subscribe(
    
        (response) => {
            console.log("Order posted successfully", response);
            console.log("Ordere Data!");
            
        },
        (error: any) => { 
            console.error("Failed to post order", error);
            console.log(error);
            
        }
    );
}

}

