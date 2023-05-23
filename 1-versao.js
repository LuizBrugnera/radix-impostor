const fs = require("fs");

function flattenArray(arrayOfArrays) {
  const flattenedArray = arrayOfArrays.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
  }, []);
  return flattenedArray;
}

async function ordenaLogs(dataBrute) {
  const dataOrdLog = [];

  for (let i = 0; i < dataBrute.length; i++) {
    if (dataOrdLog[dataBrute[i].log] === undefined) {
      dataOrdLog[dataBrute[i].log] = [].concat(dataBrute[i]);
    } else {
      dataOrdLog[dataBrute[i].log].push(dataBrute[i]);
    }
  }

  return flattenArray(dataOrdLog);
}

async function ordenaMonth(dataOrdLog) {
  const dataOrdMonth = [];
  const monthTranslate = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  for (let i = 0; i < dataOrdLog.length; i++) {
    if (dataOrdMonth[monthTranslate[dataOrdLog[i].month]] === undefined) {
      dataOrdMonth[monthTranslate[dataOrdLog[i].month]] = [].concat(
        dataOrdLog[i]
      );
    } else {
      dataOrdMonth[monthTranslate[dataOrdLog[i].month]].push(dataOrdLog[i]);
    }
  }

  return flattenArray(dataOrdMonth);
}

async function mainFunction(data, target) {
  const dataBrute = await JSON.parse(data);
  const dataOrdLog = await ordenaLogs(dataBrute);
  const dataOrdMonth = await ordenaMonth(dataOrdLog);
  console.log(dataOrdMonth[target]);
  return dataOrdMonth[target];
}

fs.readFile("./json-creator/data-50000.json", "utf-8", async (err, data) => {
  if (err) throw err;

  const startTime = performance.now();

  await mainFunction(data, 30000);
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;

  console.log(
    `A função levou ${totalTime} milisegundos para ser executada.`
  );
});
