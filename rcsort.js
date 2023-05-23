const fs = require("fs");

async function radixSort(data, target) {
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

  const getMonthIndex = (month) => {
    return monthTranslate[month];
  };

  const countingSortByLog = (array) => {
    let maxLog = array[0].log;
    let minLog = array[0].log;

    // Get the maximum and minimum log values
    for (let i = 1; i < array.length; i++) {
      maxLog = Math.max(maxLog, array[i].log);
      minLog = Math.min(minLog, array[i].log);
    }

    // Initialize the counting array
    const count = new Array(maxLog - minLog + 1).fill(0);

    // Count the occurrences of each log value
    for (let i = 0; i < array.length; i++) {
      count[array[i].log - minLog]++;
    }

    // Modify the counting array to store the position of each element in the sorted array
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    // Create the sorted array
    const sortedArray = new Array(array.length);
    for (let i = array.length - 1; i >= 0; i--) {
      const log = array[i].log;
      sortedArray[count[log - minLog] - 1] = array[i];
      count[log - minLog]--;
    }

    return sortedArray;
  };

  const sortData = (array) => {
    const bucketSize = 12;
    let buckets = Array.from({ length: bucketSize }, () => []);

    // Distribute the objects in the buckets according to the month
    for (let i = 0; i < array.length; i++) {
      const monthIndex = getMonthIndex(array[i].month);
      buckets[monthIndex].push(array[i]);
    }

    // Sort the objects within each bucket by log using counting sort
    for (let i = 0; i < buckets.length; i++) {
      let bucket = buckets[i];
      bucket = countingSortByLog(bucket);
      buckets[i] = bucket;
    }

    // Return the sorted array
    return [].concat(...buckets);
  };

  const dataBrute = JSON.parse(data);
  const dataOrdLogMonth = sortData(dataBrute);
  console.log(dataOrdLogMonth)
  console.log(dataOrdLogMonth[target]);
  return dataOrdLogMonth[target];
}

fs.readFile("./json-creator/data-2000000.json", "utf-8", async (err, data) => {
  if (err) throw err;

  // the index of the suspect log
  const target = 500000;

  const startTime = performance.now();

  await radixSort(data, target);
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;

  console.log(
    `A função levou ${totalTime} milisegundos para ser executada.`
  );
  
});