const CustomerVehicleData = require('../src/index');

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
  },
  {
    id: 3,
    first_name: "Bob",
    last_name: "Johnson",
    purchased: "2020-01-01T00:00:00Z",
    lastpayment: "2021-01-01T00:00:00Z",
    phone: "5555555555",
    make: "toyota",
    model: "corolla",
    city: "new york"
  }
];

describe('CustomerVehicleData', () => {
  let customerData;

  beforeEach(() => {
    customerData = new CustomerVehicleData(testData);
  });

  describe('Basic Queries', () => {
    test('getAllCustomers returns all customers', () => {
      expect(customerData.getAllCustomers()).toHaveLength(3);
    });

    test('findByMake returns correct customers', () => {
      const toyotaCustomers = customerData.findByMake('toyota');
      expect(toyotaCustomers).toHaveLength(2);
      expect(toyotaCustomers[0].first_name).toBe('John');
      expect(toyotaCustomers[1].first_name).toBe('Bob');
    });

    test('findByModel returns correct customers', () => {
      const civicCustomers = customerData.findByModel('civic');
      expect(civicCustomers).toHaveLength(1);
      expect(civicCustomers[0].first_name).toBe('Jane');
    });

    test('findByCity returns correct customers', () => {
      const nyCustomers = customerData.findByCity('new york');
      expect(nyCustomers).toHaveLength(2);
      expect(nyCustomers[0].first_name).toBe('John');
      expect(nyCustomers[1].first_name).toBe('Bob');
    });
  });

  describe('Date-based Queries', () => {
    test('getCustomersAfterDate returns correct customers', () => {
      const recentCustomers = customerData.getCustomersAfterDate('2019-12-31');
      expect(recentCustomers).toHaveLength(1);
      expect(recentCustomers[0].first_name).toBe('Bob');
    });

    test('getCustomersWithLastPaymentBefore returns correct customers', () => {
      const latePayers = customerData.getCustomersWithLastPaymentBefore('2020-01-01');
      expect(latePayers).toHaveLength(2);
      expect(latePayers[0].first_name).toBe('John');
      expect(latePayers[1].first_name).toBe('Jane');
    });
  });

  describe('Statistics', () => {
    test('getStatistics returns correct statistics', () => {
      const stats = customerData.getStatistics();
      expect(stats.totalCustomers).toBe(3);
      expect(stats.uniqueMakes).toBe(2);
      expect(stats.uniqueModels).toBe(3);
      expect(stats.uniqueCities).toBe(2);
    });

    test('getMakeDistribution returns correct distribution', () => {
      const distribution = customerData.getMakeDistribution();
      expect(distribution.toyota).toBe(2);
      expect(distribution.honda).toBe(1);
    });

    test('getCityDistribution returns correct distribution', () => {
      const distribution = customerData.getCityDistribution();
      expect(distribution['new york']).toBe(2);
      expect(distribution['los angeles']).toBe(1);
    });
  });

  describe('Sorting and Filtering', () => {
    test('sortBy sorts correctly', () => {
      const sortedByLastName = customerData.sortBy('last_name');
      expect(sortedByLastName[0].last_name).toBe('Doe');
      expect(sortedByLastName[1].last_name).toBe('Johnson');
      expect(sortedByLastName[2].last_name).toBe('Smith');
    });

    test('filterBy filters correctly', () => {
      const filtered = customerData.filterBy({
        make: 'toyota',
        city: 'new york'
      });
      expect(filtered).toHaveLength(2);
      expect(filtered[0].first_name).toBe('John');
      expect(filtered[1].first_name).toBe('Bob');
    });
  });
}); 