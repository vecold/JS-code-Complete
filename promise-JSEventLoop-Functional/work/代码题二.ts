const fp2 = require('lodash/fp');

const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
];

let isLastInStock = function (cars) {
  let last_car = fp2.last(cars);
  return fp2.prop('in_stock', last_car);
}
console.log(isLastInStock(cars));
let isLastInStockV2 = fp2.flowRight(fp2.prop('in_stock'),fp2.last);
console.log(isLastInStockV2(cars));

let getFirstName = fp2.flowRight(fp2.prop('name'),fp2.first);
console.log(getFirstName(cars));

let _average = function (xs) {
  return fp2.reduce(fp2.add, 0, xs) / xs.length;
}

let averaegDollarValue = function (cars) {
  let dollar_values = fp2.map(function (car){
    return car.dollar_value
  },cars);
  return _average(dollar_values);
}

console.log(averaegDollarValue(cars));

let averaegDollarValueV2 = fp2.flowRight(_average,fp2.map(fp2.prop('dollar_value')));
console.log(averaegDollarValueV2(cars));

let _underscore = fp2.replace(/\W+/g,'_');
let sanitizeNames = fp2.flowRight(fp2.map(fp2.flowRight(_underscore,fp2.toLower)));
console.log(sanitizeNames(['Hello World','Hello 222']));


