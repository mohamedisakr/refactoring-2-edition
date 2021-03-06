const Producer = require("./producer");

class Province {
  constructor(data) {
    this._producers = [];
    this._totalProduction = 0;

    this._name = data.name;
    this._demand = data.demand;
    this._price = data.price;

    data.producers.forEach((prod) =>
      this.addProducer(new Producer(this, prod))
    );
  }

  addProducer(producer) {
    this._producers.push(producer);
    this._totalProduction += producer.production;
  }

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._totalProduction;
  }

  set totalProduction(production) {
    this._totalProduction = production;
  }

  get demand() {
    return this._demand;
  }

  set demand(demand) {
    this._demand = parseInt(demand);
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = parseInt(price);
  }

  get shortfall() {
    return this._demand - this._totalProduction;
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });

    return result;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }
}

module.exports = Province;

/*
function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
*/
