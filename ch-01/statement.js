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

  invoice.performances.forEach((perf) => {
    // console.log(`play id :${perf.playID}, audience: ${perf.audience}`);
    const play = plays[perf.playID];
    // console.log(play);
    let theAmount = 0;

    switch (play.type) {
      case "tragedy":
        theAmount = 40000;
        perf.audience > 30
          ? (theAmount += 1000 * (perf.audience - 30))
          : (theAmount += 0);
        break;
      case "comedy":
        theAmount = 30000;
        perf.audience > 20
          ? (theAmount += 10000 + 500 * (perf.audience - 20))
          : (theAmount += 0);
        theAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    play.type === "comedy"
      ? (volumeCredits += Math.floor(perf.audience / 5))
      : (volumeCredits += 0);

    // print line for this order
    result += ` ${play.name}: $${theAmount / 100} (${perf.audience} seats)\n`; // ${format(theAmount / 100)}
    totalAmount += theAmount;
  });
  result += `Amount owed is $${totalAmount / 100}\n`; //${format(totalAmount / 100)}
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

const result = printStatement(data.invoice[0], data.plays);
console.log(result);
