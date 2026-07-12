/* --------------- Part 1 ---------------------*/

function cookRice(){
    console.log("Rice starting...");
    let count = 0;
    for (let i = 0; i < 100000000; i++) {
        count++;
    }
    console.log("Rice done!");
}

cookRice();
console.log("Am Farouk yells at the next customer");

function cookRiceAsync(){
    console.log("Rice starting...");
    let count = 0;
    setTimeout(() => {
    for (let i = 0; i < 100000000; i++) {
        count++;
    }  
    }, 2000);

    console.log("Rice done!");
}

cookRiceAsync();
console.log("Am Farouk yells at the next customer")

// in the cookRice() function the code is sequential, it runs synchronously
// in the cookRiceAsync() funciton, it prints both statemnts while waiting 2 seconds to execute the code inside the setTimeout funciton 


/* --------------- Part 2 ---------------------*/

function orderRice(callback: (message:string) => void){
    console.log("Calling the rice supplier...");

    setTimeout(() => {
     const message = "Rice delivered!";
    callback(message);
  }, 1000);

}

orderRice((message) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");


/* --------------- Part 3 ---------------------*/

const koshariOrder = new Promise((resolve,reject)=>{
    setTimeout(()=> {
        resolve("Order ready! 🍝");
    })
});

koshariOrder
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.log(error);
    });


const sauceOrder = new Promise((resolve,reject)=>{
    reject("We're out of da2a!");
});

sauceOrder
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.log(error);
    });


/* --------------- Part 4 ---------------------*/
function getRice(): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        setTimeout(()=>{
            resolve("Rice ready");
        }, 1000);
    });
}

function getChickpeas(rice: string) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
        setTimeout(()=>{
            resolve("Chickpeas ready, rice was: " + rice);
        }, 1000);
    });
}

function getSauce(chickpeas:string) : Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Sauce added, previous: " + chickpeas);
        }, 1000);
    });
}

getRice()
    .then((rice) => getChickpeas(rice))
    .then((chickpeas)=> getSauce(chickpeas))
    .then((finalOrder) => {
        console.log("Complete order:", finalOrder);
    })
    .catch((error)=>{
        console.log("sorry, Somehting went wrong.")
    });


/* --------------- Part 5 ---------------------*/
async function makeKoshari(){
    try{
        const rice = await getRice();
        const chickpeas = await getChickpeas(rice);
        const finalOrder = await getSauce(chickpeas);

        console.log(finalOrder);
    }
    catch{
        console.log("sorry, Somehting went wrong.")
    }
}

makeKoshari();
