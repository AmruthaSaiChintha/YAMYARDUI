import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartiems:any[]=[];
  private cartitemkey='cartiems';
  private totalamountkey='totalamount';
  totalamount:number=0;

  constructor() {
   const storedcartitems=sessionStorage.getItem(this.cartitemkey)
   if(storedcartitems)
   {
    this.cartiems=JSON.parse(storedcartitems)
   }
   }
 addToCart(menuitem:any)
 {
  this.cartiems.push(menuitem);
  this.savecartitems();
}
getcartItems()
 {
   return this.cartiems;
 }
 calculateprice(): number {
  this.totalamount=0
  for(const item of this.cartiems)
  {
    this.totalamount+=item.price;
  }
  return this.totalamount;
  
}


private savecartitems()
{
  sessionStorage.setItem(this.cartitemkey, JSON.stringify(this.cartiems));
}
removefromcart(menuitem:any)
{
  const index=this.cartiems.findIndex((item)=>item.id==menuitem.id)
  if(index!==-1)
  {
    this.cartiems.splice(index,1)
    this.savecartitems();
  }
}
}
