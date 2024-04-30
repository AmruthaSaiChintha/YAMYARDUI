import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartiems:any[]=[];
  private cartitemkey='cartiems';
  private totalamountkey='totalamount';
  private lengthkey='length';
  totalamount:number=0;
  lengthcal:number=0;


  constructor() {
   const storedcartitems=sessionStorage.getItem(this.cartitemkey)
   if(storedcartitems)
   {
    this.cartiems=JSON.parse(storedcartitems)
   }
   }
   addToCart(menuitem: any) {
    const existingItemIndex = this.cartiems.findIndex(item => item.id === menuitem.id);
    if (existingItemIndex !== -1) {
      this.cartiems[existingItemIndex].quantity++;
    } else {
      menuitem.quantity = 1;
      this.cartiems.push(menuitem);
    }
    this.savecartitems();
  }
  
  
  
  removeItem(menuitem: any) {
    const index = this.cartiems.findIndex(item => item.id === menuitem.id);
    if (index !== -1) {
      this.cartiems.splice(index, 1);
      this.savecartitems();
    }
  }
  
  
getcartItems()
 {
  
   return this.cartiems;
   
 }
 calculateprice(): number {
  this.totalamount = 0;
  for (const item of this.cartiems) {
    this.totalamount += item.price * item.quantity; // Update to multiply by quantity
  }
  // sessionStorage.setItem(this.totalamountkey, JSON.stringify(this.totalamount));

  return this.totalamount;
}


public savecartitems()
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

gettingtotalamout()
{
  // const storedtotalamount=sessionStorage.getItem(this.totalamountkey)
  // if(storedtotalamount)
  // {
  //   this.totalamount=JSON.parse(storedtotalamount)
  // }
  // return this.totalamount;
}
}