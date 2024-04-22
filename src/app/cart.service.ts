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
  
 addToCart(menuitem:any)
 {
  menuitem.quantity=1;
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
  sessionStorage.setItem(this.totalamountkey, JSON.stringify(this.totalamount));
  return this.totalamount; 
}
gettingtotalamout():number
{
  const storedTotalAmount=sessionStorage.getItem(this.totalamountkey);
  if(storedTotalAmount)
  {
    this.totalamount=JSON.parse(storedTotalAmount);
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
getlength():number{
  this.lengthcal=this.cartiems.reduce((total,item)=>total+item.quantity,0);
  sessionStorage.setItem(this.lengthkey,JSON.stringify(this.lengthcal));
 
  return this.lengthcal;
 }
}
