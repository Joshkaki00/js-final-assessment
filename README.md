# Customer Vehicle Data Library

A JavaScript library for processing and analyzing customer and vehicle data.

## Installation

```bash
npm install customer-vehicle-data
```

## Usage

```javascript
const CustomerVehicleData = require('customer-vehicle-data');
const data = require('./data.json');

const customerData = new CustomerVehicleData(data);

// Basic Queries
const allCustomers = customerData.getAllCustomers();
const toyotaCustomers = customerData.findByMake('toyota');
const civicCustomers = customerData.findByModel('civic');
const cityCustomers = customerData.findByCity('charlottetown');

// Date-based Queries
const recentCustomers = customerData.getCustomersAfterDate('2019-01-01');
const latePayers = customerData.getCustomersWithLastPaymentBefore('2020-12-31');

// Statistics
const stats = customerData.getStatistics();
console.log(stats);
// {
//   totalCustomers: 1000,
//   uniqueMakes: 25,
//   uniqueModels: 150,
//   uniqueCities: 500,
//   makeDistribution: { toyota: 150, honda: 120, ... },
//   cityDistribution: { 'new york': 50, 'los angeles': 45, ... },
//   averageDaysSincePurchase: 365,
//   averageDaysSinceLastPayment: 30
// }

// Sorting
const sortedByPurchaseDate = customerData.sortBy('purchased', true);
const sortedByLastName = customerData.sortBy('last_name', false);

// Advanced Filtering
const filteredCustomers = customerData.filterBy({
  make: 'toyota',
  city: 'new york',
  purchased: '2019-01-01'
});
```

## API

### Basic Queries

#### `getAllCustomers()`
Returns an array of all customers in the dataset.

#### `findByMake(make)`
Returns an array of customers who own vehicles of the specified make.

#### `findByModel(model)`
Returns an array of customers who own vehicles of the specified model.

#### `findByCity(city)`
Returns an array of customers who live in the specified city.

### Date-based Queries

#### `getCustomersAfterDate(date)`
Returns an array of customers who purchased their vehicle after the specified date.

#### `getCustomersWithLastPaymentBefore(date)`
Returns an array of customers who made their last payment before the specified date.

### Statistics

#### `getStatistics()`
Returns an object containing various statistics about the data:
- Total number of customers
- Number of unique makes, models, and cities
- Distribution of makes and cities
- Average days since purchase and last payment

#### `getMakeDistribution()`
Returns an object showing the count of each vehicle make.

#### `getCityDistribution()`
Returns an object showing the count of customers in each city.

#### `getAverageDaysSincePurchase()`
Returns the average number of days since customers purchased their vehicles.

#### `getAverageDaysSinceLastPayment()`
Returns the average number of days since customers made their last payment.

### Sorting and Filtering

#### `sortBy(field, ascending = true)`
Sorts customers by the specified field. Supports all fields including dates.

#### `filterBy(criteria)`
Filters customers based on multiple criteria. Supports partial matches for strings and date comparisons.

## License

MIT 