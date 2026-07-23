import { Request, Response } from "express";
import fleet from "../model/microbus";


const getfleet = (req:Request, res:Response)=>{
    res.send(fleet);
}

const getfleetbyid = (req:Request, res:Response)=>{
    const id = Number(req.params.id);
    const microbus = fleet.find(bus => bus.id === id);

    if(microbus){
        res.status(200).send(microbus);
    }
    else{
        res.status(404).send("Am Ashraf doesn't run that one");
    }
}


const postfleet = (req:Request, res:Response) =>{
    const {driverName, route, farePerSeat, seatsAvailable} = req.body;
    
    if(!driverName || !route || !farePerSeat || !seatsAvailable){
    res.status(400).json("missing field");
    }
    else{
    const newmicrobus= {
        id : fleet.length +1,
        driverName,
        route, 
        farePerSeat,
        seatsAvailable,
        ratings: []
    };

    fleet.push(newmicrobus);
    res.status(201).json(newmicrobus);
    }
}

const putfleetbyid = (req:Request, res:Response)=>{
    const id = Number(req.params.id);
    const micro = fleet.find(bus => bus.id === id);
    
    if(micro){
    const {driverName, route, farePerSeat, seatsAvailable, ratings} = req.body;
    if(driverName !== undefined)
        micro.driverName = driverName;

    if(route !== undefined)
        micro.route = route;

    if(farePerSeat !== undefined)
        micro.farePerSeat = farePerSeat;

    if(seatsAvailable !== undefined)
        micro.seatsAvailable = seatsAvailable;

    if(ratings !== undefined)
        micro.ratings = ratings;

    res.status(200).json("Updated successfully");
    }
    else{
    res.status(404).json("This microbus does not exist");
    }
}

const deletefleetbyid = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = fleet.findIndex(bus => bus.id === id);

  if (index === -1) {
    res.status(404).json("Microbus does not exist");
    return;
  }

  fleet.splice(index, 1);
  res.status(200).json("Microbus is removed");
};


const maxfare = (req: Request, res: Response)=>{
    const { maxFare } = req.query;
    
    if(maxFare === undefined){
    res.status(400).json({ message: "maxFare is undefined" });
    }
    else{
    const maxfare = Number(maxFare);
    const after = fleet.filter(mircobus => mircobus.farePerSeat <=maxfare);
    res.status(200).json(after);
    }
}

const getraterandid = (req:Request, res:Response)=>{
    const id = Number(req.params.id);
  const rater = req.query.rater as string;

  if (isNaN(id) || !rater) {
    res.status(400).json({ error: "Invalid id or missing rater" });
    
  }
  else{
    const microbus = fleet.find(bus => bus.id === id);

    if (!microbus) {
      res.status(404).json({ message: "Bus not found" });
    }
    else{
      const ratingEntry = microbus.ratings.find(r => r.hasOwnProperty(rater));
  
      if (!ratingEntry) {
        res.status(200).json({ message: `${rater} did not this bus` });
      }
      else{
        res.status(200).json({ rater, rating: ratingEntry[rater] });
      }
  
    }
  }
}

export {getfleet, getfleetbyid, postfleet, putfleetbyid, deletefleetbyid, maxfare, getraterandid};