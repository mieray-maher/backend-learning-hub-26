function calculateOrderTotal(items: Array<{ price: number; qty: number }>, discount: number): number {
  let total: number = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

// //by the frontend team
interface order {
  customer:string,
  items: [
      { price:string | number, qty:number },    
      { price:number, qty:number},
    ],
    shippingAddress: [
        { city:string; }
    ]
};

// //by the frontend team
const order1 = {
    customer: "Layla",
    items: [
        { price: "250 EGP", qty: 2 },    
        { price: 100, qty: 1 },
    ],
};

// console.log(calculateOrderTotal(order.items, "50")); 
// console.log(order.shippingAddress.city);

/*price of item 1 is a string and can not be computed because it does not know what is EGP*/
/*city is not included in the object order*/

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

function canCancelOrder(status: OrderStatus): boolean{
    if(status == "pending" || status == "shipped")
        return true;

    return false;
}

//let ans:boolean = canCancelOrder("refunded");
/*ERROR: because refunded is not from the option the orderstatus*/



type WarehouseBin = [aisle: number, shelf: number];
const binForOrder: WarehouseBin = [4, 12];

//const badBin: WarehouseBin = [4, 12, "extra"]
/*fails because badBin has an extra argument which is not defined in tupple WarehouseBin, expected 2 values found 3 */


class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

interface Product { 
    id: string; 
    name: string; 
    price: number ;
}

const productRepo = new Repository<Product>()

productRepo.add({ id: "p1", name: "Desk Lamp", price: 150 });
productRepo.add({ id: "p2", name: "Keyboard", price: 300 });

interface Customer { 
    id: string; 
    name: string; 
    age: string 
}

const customerRepo = new Repository<Customer>()

customerRepo.add({id:"555",name:"Mieray",age:"21"});

// if you try to .add() an object missing id, Typescript will show that there is an error during compile time 

interface Products {
  id: string;
  name: string;
  price: number;
  costPrice: number; 
}

interface OrderItem {
  product: Products;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;        // reuse Part 2's type
  shippedAt?: string;         // optional — only exists once shipped
  readonly createdAt: string; // set once, never changes
}

//creating a full order 
const firstorder:Order={
  id: "597",
  customer: "100",
  items: [
    {
        product: {
        id: "597",
        name: "dji",
        price: 10000,
        costPrice: 500}, 
        qty: 2
    }
    ],
  status: "pending",
  createdAt:"7/7/2026"
}

function shipOrder(order: Order): Order {
  return {
    ...order,
    status: "shipped",
    shippedAt: new Date().toISOString(),
  };
}

// order.createdAt = "new date"
/*compile time error is readonly, it is already set and it can't be modified*/

function secondcalculateOrderTotal(items: Order["items"], discount: number): number {
  let total: number = 0;
  for (const item of items) {
    total += item.product.price * item.qty;
  }
  return total - discount;
}

console.log(secondcalculateOrderTotal(firstorder.items, 100));


// What the customer-facing API is allowed to return — never leak costPrice
type PublicProduct = Omit<Products, "costPrice">;

// What's required to create a new product — no id yet, the DB assigns it
type CreateProductInput = Omit<Products, "id">;

// What's allowed when editing a product — any subset of fields
type UpdateProductInput = Partial<Products>;

// A fast lookup table by product id
type ProductCatalog = Record<string, Products>;


function toPublicProduct(product: Products): PublicProduct {
  const { costPrice, ...publicProduct } = product;
  
  return publicProduct;
}

function createProduct(input: CreateProductInput): Products {
  const newProduct: Products = {
    id: crypto.randomUUID(),
    name: input.name,
    price: input.price,
    costPrice: input.costPrice
  };
  return newProduct;
}

function updateProduct(product: Product, changes: UpdateProductInput): Product {
  return { ...product, ...changes };
}

const catalog: ProductCatalog = {
  P1: {
    id: "Product1",
    name: "iphone",
    price: 70000,
    costPrice: 70000,
  },
  P2: {
    id: "Product2",
    name: "graphictablet",
    price: 20000,
    costPrice: 5000,
  },
};

console.log(catalog["product1"]);


/*For a small team  --> colocated types 
because 1)boosts local discoverability 
2)allowing developers to see the data shape and the function using it simultaneously without switching files.
3)reduces the risk of merge conflicts

For  a large one (50+ devs across teams) --> centralized types
because 1)Eliminates Duplication
2)Simplifies Package Sharing (This allows backend team and frontend team to strictly adhere to the exact same contract.)
*/

function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

function receiveFromWarehouse(product: Products): void {
  console.log("Received:", product.name);
}

receiveFromWarehouse(getExternalWarehouseData())
/* uses a structural typing... instead of checking the nominal name or identity of the type, TypeScript only checks the shape of the data.*/

// receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" })
/*Typescript has an excess property check*/

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function placeOrder(customer: string, items: OrderItem[]): Result<Order> {
  if (items.length === 0) {
    return { success: false, error: "Order must contain at least one item" };
  }

  const order: Order = {
    id: crypto.randomUUID(),
    customer,     
    items,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return { success: true, data: order };
}

//empty
const empty = placeOrder("Mieray", []);
if (empty.success) {
  console.log("Order made:", empty.data);
} 
else {
  console.log("Order failed:", empty.error);
}


//real
const real = placeOrder("Mieray", [
  {
    product: { 
      id: "Product1",
      name: "iphone",
      price: 70000,
      costPrice: 70000,
    },
    qty: 1 
  }
]);
if (real.success) {
  console.log("Order made:", real.data, "status:", real.data.status);
} 
else {
  console.log("Order failed:", real.error);
}


