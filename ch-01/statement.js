import data from "./data.js";

function printStatement(invoice, plays) {
  //   console.log("Starting to print statement");
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  //   const format = new Intl.NumberFormat("en­US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 2,
  //   }).format;

  invoice.performances.forEach(({ playID, audience }) => {
    // console.log(`play id :${playID}, audience: ${audience}`);
    const { name, type } = plays[playID];
    let theAmount = 0;

    switch (type) {
      case "tragedy":
        theAmount = 40000;
        audience > 30
          ? (theAmount += 1000 * (audience - 30))
          : (theAmount += 0);
        break;
      case "comedy":
        theAmount = 30000;
        audience > 20
          ? (theAmount += 10000 + 500 * (audience - 20))
          : (theAmount += 0);
        theAmount += 300 * audience;
        break;
      default:
        throw new Error(`unknown type: ${type}`);
    }

    volumeCredits += Math.max(audience - 30, 0);

    // add extra credit for every ten comedy attendees
    type === "comedy"
      ? (volumeCredits += Math.floor(audience / 5))
      : (volumeCredits += 0);

    // print line for this order
    result += `\t${name}: $${theAmount / 100} (${audience} seats)\n`; // ${format(theAmount / 100)}
    totalAmount += theAmount;
  });
  result += `Amount owed is $${totalAmount / 100}\n`; //${format(totalAmount / 100)}
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

const result = printStatement(data.invoice[0], data.plays);
console.log(result);

// console.log("======================================");

// data.invoice[0].performances.forEach((per) => {
//   const play = data.plays[per.playID];
//   console.log(play);
// });
