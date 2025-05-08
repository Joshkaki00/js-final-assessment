import CustomerVehicleData from './src/index';
import * as fs from 'fs';

// Read and parse the data
const rawData = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(rawData);

// Create an instance of CustomerVehicleData
const customerData = new CustomerVehicleData(data);

// Example 1: Basic customer information
const firstCustomer = data[0];
console.log('Customer Information:');
console.log(customerData.formatCustomer(firstCustomer));

// Example 2: Payment tracking
console.log('\nPayment Tracking:');
const latePayers = customerData.getLatePayers();
console.log(`Number of late payers: ${latePayers.length}`);

const paymentStats = customerData.getPaymentStatistics();
console.log('\nPayment Statistics:');
console.log(`Total Payments: ${CustomerVehicleData.formatCurrency(paymentStats.totalPayments)}`);
console.log(`Average Payment: ${CustomerVehicleData.formatCurrency(paymentStats.averagePayment)}`);
console.log(`Highest Payment: ${CustomerVehicleData.formatCurrency(paymentStats.highestPayment)}`);
console.log(`Lowest Payment: ${CustomerVehicleData.formatCurrency(paymentStats.lowestPayment)}`);

// Example 3: Payment period analysis
const periodTotal = customerData.getTotalPaymentsInPeriod(
  '2019-12-01T00:00:00Z',
  '2020-01-31T00:00:00Z'
);
console.log('\nPayment Period Analysis:');
console.log(`Total payments in period: ${CustomerVehicleData.formatCurrency(periodTotal)}`);

// Example 4: Customer payment status
const paymentStatus = customerData.getCustomersByPaymentStatus();
console.log('\nPayment Status Summary:');
console.log(`Current payers: ${paymentStatus.current.length}`);
console.log(`Late payers: ${paymentStatus.late.length}`);
console.log(`No payments: ${paymentStatus.noPayments.length}`);

// Example 5: Detailed customer information with payments
console.log('\nDetailed Customer Information with Payments:');
console.log(customerData.formatCustomerWithPayments(firstCustomer));

// Example output:
// Neel Mclarty
//
// Saturn S-series
//
// Purchased: April 3, 2018
//
// Last Payment: 8 months ago
//
// Phone: (153) 158-9353
//
// City: Sikeshu
