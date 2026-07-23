interface Rating {
  [passengerName: string]: number;
}
interface Microbus {
    id : number;
    driverName : string;
    route :string;
    farePerSeat :number;
    seatsAvailable :number;
    ratings : Rating[];
}

let fleet: Microbus[] = [
  {
    id: 1,
    driverName: "Am Ashraf",
    route: "Ramses",
    farePerSeat: 7,
    seatsAvailable: 14,
    ratings: [{ Hossam: 5 }, { Nour: 4 }],
  },
  {
    id: 2,
    driverName: "Mohamed",
    route: "Dokki",
    farePerSeat: 6,
    seatsAvailable: 12,
    ratings: [{ Mona: 5 }, { Tarek: 3 }],
  },
  {
    id: 3,
    driverName: "Farouk",
    route: "Attaba",
    farePerSeat: 5,
    seatsAvailable: 10,
    ratings: [{ Salma: 4 }],
  },
  {
    id: 4,
    driverName: "Gaber",
    route: "Giza",
    farePerSeat: 6,
    seatsAvailable: 13,
    ratings: [{ Youssef: 5 }, { Rania: 5 }],
  },
];

export default fleet;