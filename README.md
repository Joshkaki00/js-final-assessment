# Customer Vehicle Data Library

A TypeScript library for processing and analyzing customer and vehicle data.

## Installation

```bash
npm install customer-vehicle-data
```

## Usage

```typescript
import CustomerVehicleData from 'customer-vehicle-data';
import * as fs from 'fs';

// Read and parse the data
const rawData = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(rawData);

const customerData = new CustomerVehicleData(data);

// Basic Queries
const allCustomers = customerData.getAllCustomers();
const toyotaCustomers = customerData.findByMake('toyota');
const civicCustomers = customerData.findByModel('civic');
const cityCustomers = customerData.findByCity('charlottetown');

// Date-based Queries
const recentCustomers = customerData.getCustomersAfterDate('2019-01-01');
const latePayers = customerData.getCustomersWithLastPaymentBefore('2020-12-31');

// Payment Features
const paymentStats = customerData.getPaymentStatistics();
console.log(paymentStats);
// {
//   totalPayments: 1200,
//   averagePayment: 400,
//   highestPayment: 500,
//   lowestPayment: 300
// }

const periodTotal = customerData.getTotalPaymentsInPeriod(
  '2019-12-01T00:00:00Z',
  '2020-01-31T00:00:00Z'
);

const paymentStatus = customerData.getCustomersByPaymentStatus();
// {
//   current: [...],
//   late: [...],
//   noPayments: [...]
// }

// Statistics
const stats = customerData.getStatistics();
console.log(stats);
// {
//   totalCustomers: 1000,
//   uniqueMakes: 25,
//   uniqueModels: 150,
//   uniqueCities: 500,
//   averagePaymentAmount: 400
// }

// Sorting and Filtering
const sortedByPurchaseDate = customerData.sortBy('purchased');
const filteredCustomers = customerData.filterBy({
  make: 'toyota',
  city: 'new york'
});

// Formatting
const formattedCustomer = customerData.formatCustomer(data[0]);
// Output:
// John Doe
//
// Toyota Camry
//
// Purchased: January 21, 2019
//
// Last Payment: 3 months ago
//
// Phone: (415) 544-8375
//
// City: New York
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

### Payment Features

#### `getLatePayers()`
Returns an array of customers who haven't made a payment in the last 30 days.

#### `getTotalPaymentsInPeriod(startDate, endDate)`
Returns the total amount of payments made within the specified date range.

#### `getPaymentStatistics()`
Returns an object containing payment statistics:
- Total payments
- Average payment
- Highest payment
- Lowest payment

#### `getCustomersByPaymentStatus()`
Returns an object grouping customers by payment status:
- Current payers (paid within last 30 days)
- Late payers (no payment in last 30 days)
- No payments (payment amount is 0)

### Statistics

#### `getStatistics()`
Returns an object containing various statistics about the data:
- Total number of customers
- Number of unique makes, models, and cities
- Average payment amount

#### `getMakeDistribution()`
Returns an object showing the count of each vehicle make.

#### `getCityDistribution()`
Returns an object showing the count of customers in each city.

### Sorting and Filtering

#### `sortBy(field)`
Sorts customers by the specified field. Supports all fields including dates.

#### `filterBy(criteria)`
Filters customers based on multiple criteria. Supports partial matches for strings and date comparisons.

### Formatting

#### `formatCustomer(customer)`
Returns a formatted string with customer information including:
- Name (properly capitalized)
- Vehicle make and model
- Purchase date
- Last payment (relative time)
- Phone number (formatted)
- City

#### `formatCustomerWithPayments(customer)`
Returns a formatted string with additional payment information.

#### `formatPhoneNumber(phone)`
Formats a phone number as (xxx) xxx-xxxx.

#### `formatCurrency(amount)`
Formats a number as USD currency.

## License

MIT 