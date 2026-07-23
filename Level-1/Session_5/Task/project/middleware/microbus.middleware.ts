import {Request, Response, NextFunction} from 'express';

const validateMicrobus = (req:Request, res:Response, next:NextFunction)=>{

    const {driverName, route, farePerSeat, seatsAvailable} = req.body;
    if(farePerSeat <=0){
        return res.status(404).json({
            error: "Invalid farePerSeat"
        });
    }
    
    if(seatsAvailable <=0){
        return res.status(404).json({
            error: "Invalid seatsAvailable"
        });
    }

    next();
};

const logging = (req:Request, res:Response, next:NextFunction)=>{
    console.log(`${req.method} ${req.url}`);
    next();
};

export {validateMicrobus , logging};