import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuitems: any;
  cartItems: any[] = [];
  totalAmount: number = 0;
  itemsadded: number = 0;
  sample :number=0;
  cartitem :any;
  totalprice:number=0;


  private geturl = "https://localhost:44387/api/MenuItems";

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) { }

  getusers(): Observable<any> {
    return this.http.get(this.geturl);
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getcartItems();
    this.getusers().subscribe((data: any) => {
      this.menuitems = data;
    });
    this.gettotalamount();
  }

  addToCart(menuitem: any) {
    this.sample = this.sample + 1;
    console.log(this.sample);
    this.cartitem = JSON.parse(JSON.stringify(menuitem));
    this.cartitem.quantity = this.sample;
    this.cartService.addToCart(this.cartitem);
    console.log(this.cartitem.quantity);
    console.log(this.cartitem);
    console.log("menu item"+menuitem.quantity);
    menuitem.quantity--;
     this.updatecart();
  }
   
  gettotalamount()
  {
    const totalprice=sessionStorage.getItem('totalprice');
    if(totalprice)
    {
      this.totalAmount=JSON.parse(totalprice);
    }
  }
  updatetotalprice()
  {
    this.totalprice=this.cartService.calculateprice();
  }
  
  updatecart() {
    this.totalAmount = this.cartService.calculateprice();
    this.cartItems = this.cartService.getcartItems();
  }
  
  navigate(): void {
    this.router.navigate(['/cart'], { queryParams: { totalAmount: this.totalAmount }})
  }
}
