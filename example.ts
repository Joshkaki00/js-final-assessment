import CustomerVehicleData from './src/index';
import * as fs from 'fs';

// Read and parse the data file
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Create an instance of CustomerVehicleData
const customerData = new CustomerVehicleData(data);

// Get the first customer and format their information
const firstCustomer = customerData.getAllCustomers()[0];
console.log(customerData.formatCustomer(firstCustomer));

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