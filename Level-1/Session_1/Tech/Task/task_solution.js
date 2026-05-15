let studentName = "Mieray";
const pizzaFlavor = "pepperoni";

let hungerLevel = 10;
let isPizzaHot = true;
let deliveryAddress = "shubra";

console.log(typeof hungerLevel);
console.log(typeof isPizzaHot);
console.log(typeof deliveryAddress);

let totalorder = Number("85");
totalorder += 15;
totalorder += Number(true);

console.log(totalorder);

let minutesWaiting = 45 + 15;
if(minutesWaiting % 2 == 0)
  console.log("the number of minutes you waited is even");
else 
  console.log("the number of minutes you waited is odd");

console.log(2 + 3 * 4 - 1);
console.log((2 + 3) * (4 - 1));

if(isPizzaHot && hungerLevel>7){
  console.log("OPEN THE DOOR AND SPRINT");
}
else if(isPizzaHot && hungerLevel>5){
  console.log("Walk, you have dignity");
}
else{
  console.log("Order sushi next time");
}

// hungerLevel > 5 --> is an expression which yields to a value

//if (hungerLevel > 5) { ... } is a statement which checks first if it is valid (true) or not and based on this condition it will perform a certain action  

console.log(pizzaFlavor.toUpperCase());
console.log(pizzaFlavor.length);
console.log(pizzaFlavor.includes("pepper"));

console.log(`Sir/ Madame ${studentName} ordered a ${pizzaFlavor} pizza and the total cost is ${totalorder} pounds, and he/she has been waiting for ${minutesWaiting} minutes.`);

let toppings = [0,0,0];
let order = {
  customer: studentName,
  flavor: pizzaFlavor,
  isDeliverd: false
};

// calculating TOTAL price
function calculateTotal(price, tip){
  return price + tip;
}

const calcTotalPrice = (price, tip) =>{
  return price + tip;
}

let result1 = calculateTotal(85, 15);
let result2 = calcTotalPrice(85, 15);

console.log(result1); 
console.log(result2); 

let stops = ["Ahmed","Sara", "Mona", "Tarek"];
for(let i=0; i<stops.length; i++){
  console.log(`Delivering to ${stops[i]}...`);
  if(stops[i]=="Ahmed")
    break;
}
