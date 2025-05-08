const CustomerVehicleData = require('./index');

const testData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    purchased: "2019-01-01T00:00:00Z",
    lastpayment: "2020-01-01T00:00:00Z",
    phone: "1234567890",
    make: "toyota",
    model: "camry",
    city: "new york"
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    purchased: "2018-01-01T00:00:00Z",
    lastpayment: "2019-12-31T00:00:00Z",
    phone: "0987654321",
    make: "honda",
    model: "civic",
    city: "los angeles"
  }
];

describe('CustomerVehicleData', () => {
  let customerData;

  beforeEach(() => {
    customerData = new CustomerVehicleData(testData);
  });

  test('getAllCustomers returns all customers', () => {
    expect(customerData.getAllCustomers()).toHaveLength(2);
  });

  test('findByMake returns correct customers', () => {
    const toyotaCustomers = customerData.findByMake('toyota');
    expect(toyotaCustomers).toHaveLength(1);
    expect(toyotaCustomers[0].first_name).toBe('John');
  });

  test('findByModel returns correct customers', () => {
    const civicCustomers = customerData.findByModel('civic');
    expect(civicCustomers).toHaveLength(1);
    expect(civicCustomers[0].first_name).toBe('Jane');
  });

  test('findByCity returns correct customers', () => {
    const nyCustomers = customerData.findByCity('new york');
    expect(nyCustomers).toHaveLength(1);
    expect(nyCustomers[0].first_name).toBe('John');
  });

  test('getCustomersAfterDate returns correct customers', () => {
    const recentCustomers = customerData.getCustomersAfterDate('2018-12-31');
    expect(recentCustomers).toHaveLength(1);
    expect(recentCustomers[0].first_name).toBe('John');
  });

  test('getCustomersWithLastPaymentBefore returns correct customers', () => {
    const latePayers = customerData.getCustomersWithLastPaymentBefore('2020-01-01');
    expect(latePayers).toHaveLength(1);
    expect(latePayers[0].first_name).toBe('Jane');
  });
}); 