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
    
    console.log("Existing Cart Items:", this.cartiems);
    console.log("Menu Item Being Added:", menuitem);
    
    const existingItemIndex = this.cartiems.findIndex(item => item.itemID === menuitem.itemID);
    if (existingItemIndex !== -1) {
        console.log("Existing Item Found at Index:", existingItemIndex);
        // Update quantity of existing item
        this.cartiems[existingItemIndex].quantity++;
    } else {
        console.log("New Item Being Added");
        const newItem = { ...menuitem, quantity: 1, cartItemId: this.generateUniqueId() }; // Create a new item with unique identifier
        this.cartiems.push(newItem); // Add new item to cart
    }
    console.log("Updated Cart Items:", this.cartiems);
    this.savecartitems();
}
 
private generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9); // Generate a random unique ID
}

  
  
  
  removeItem(menuitem: any) {
    const index = this.cartiems.findIndex(item => item.id === menuitem.id);
    if (index !== -1) {
      this.cartiems.splice(index, 1);
      this.savecartitems();
    }
  }
  
  
  getcartItems() {
    const storedcartitems = sessionStorage.getItem(this.cartitemkey);
    if (storedcartitems) {
       this.cartiems = JSON.parse(storedcartitems);
    }
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