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

// Get all customers
const allCustomers = customerData.getAllCustomers();

// Find customers by vehicle make
const toyotaCustomers = customerData.findByMake('toyota');

// Find customers by vehicle model
const civicCustomers = customerData.findByModel('civic');

// Find customers by city
const cityCustomers = customerData.findByCity('charlottetown');

// Get customers who purchased after a specific date
const recentCustomers = customerData.getCustomersAfterDate('2019-01-01');

// Get customers who made their last payment before a specific date
const latePayers = customerData.getCustomersWithLastPaymentBefore('2020-12-31');
```

## API

### `getAllCustomers()`
Returns an array of all customers in the dataset.

### `findByMake(make)`
Returns an array of customers who own vehicles of the specified make.

### `findByModel(model)`
Returns an array of customers who own vehicles of the specified model.

### `findByCity(city)`
Returns an array of customers who live in the specified city.

### `getCustomersAfterDate(date)`
Returns an array of customers who purchased their vehicle after the specified date.

### `getCustomersWithLastPaymentBefore(date)`
Returns an array of customers who made their last payment before the specified date.

## License

MIT 