import http from "http"

const server = http.createServer((req,res)=>{
    console.log(req.method, req.url);
    if(req.url === '/'){
        console.log("Welcome to Cairo Metro Control — Line 3");
    }
    else if(req.url === "/next-train"){
        console.log("next train arrival" , new Date().toLocaleString());
    }
    else{
        res.writeHead(404,{ "Content-Type": "text/plain" });
        console.log("Platform not found");
    }
});

server.listen(3000, ()=>{
    console.log("Listening");
});
