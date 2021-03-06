const Province = require("../ch-04/province");
// import Province, { sampleProvinceData } from "../ch-04/province.js";
// import  from "../ch-04/province";

// const sampleProvinceData = require("../ch-04/province");

describe("province", () => {
  let sampleProvinceData;

  beforeEach(() => {
    sampleProvinceData = {
      name: "Asia",
      producers: [
        { name: "Byzantium", cost: 10, production: 9 },
        { name: "Attalia", cost: 12, production: 10 },
        { name: "Sinope", cost: 10, production: 6 },
      ],
      demand: 30,
      price: 20,
    };
  });

  test("shortfall", () => {
    const asia = new Province(sampleProvinceData);
    expect(asia.shortfall).toEqual(5);
  });

  test("profit", () => {
    const asia = new Province(sampleProvinceData);
    expect(asia.profit).toEqual(230);
  });
});
