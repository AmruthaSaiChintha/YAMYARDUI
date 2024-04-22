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

  private geturl = "https://localhost:44387/api/MenuItems";

  constructor(private http: HttpClient, private router: Router,private cartservice:CartService) { }

  getusers(): Observable<any> {
    return this.http.get(this.geturl);
  }

  ngOnInit(): void {
    this.getusers().subscribe((data: any) => {
      this.menuitems = data;
    });
  }

  addToCart(menuitem: any) {
    if (menuitem.quantity > 0) {
      this.cartservice.addToCart(menuitem);
      menuitem.quantity--;
      this.updatecart();
    }
  }
  updatecart()
  {
    this.totalAmount=this.cartservice.calculateprice();
    this.cartItems=this.cartservice.getcartItems();
  }
  navigate(): void {
    const totalAmount = this.cartservice.calculateprice();
    
    this.router.navigate(['/cart']);
    
  }
  
}
