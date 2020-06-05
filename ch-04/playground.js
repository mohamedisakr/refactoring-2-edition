const Province = require("./province");

const sampleProvinceData = {
  name: "Asia",
  producers: [
    { name: "Byzantium", cost: 10, production: 9 },
    { name: "Attalia", cost: 12, production: 10 },
    { name: "Sinope", cost: 10, production: 6 },
  ],
  demand: 30,
  price: 20,
};
const asia = new Province(sampleProvinceData);
console.log(asia._demand);
console.log(asia._totalProduction);

console.log(asia.shortfall);
