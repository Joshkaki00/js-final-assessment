import CustomerVehicleData from '../src/index';

describe('Payment Features', () => {
  const currentDate = new Date();
  const thirtyOneDaysAgo = new Date(currentDate);
  thirtyOneDaysAgo.setDate(currentDate.getDate() - 31);
  const twentyNineDaysAgo = new Date(currentDate);
  twentyNineDaysAgo.setDate(currentDate.getDate() - 29);

  const testData = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      purchased: '2019-01-01T00:00:00Z',
      lastpayment: thirtyOneDaysAgo.toISOString(),
      phone: '1234567890',
      make: 'toyota',
      model: 'camry',
      city: 'new york',
      payment_amount: 500,
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      purchased: '2018-01-01T00:00:00Z',
      lastpayment: thirtyOneDaysAgo.toISOString(),
      phone: '0987654321',
      make: 'honda',
      model: 'civic',
      city: 'los angeles',
      payment_amount: 300,
    },
    {
      id: 3,
      first_name: 'Bob',
      last_name: 'Johnson',
      purchased: '2020-01-01T00:00:00Z',
      lastpayment: twentyNineDaysAgo.toISOString(),
      phone: '5555555555',
      make: 'toyota',
      model: 'corolla',
      city: 'new york',
      payment_amount: 400,
    },
  ];

  let customerData: CustomerVehicleData;

  beforeEach(() => {
    customerData = new CustomerVehicleData(testData);
  });

  describe('Late Payers', () => {
    test('identifies customers with late payments', () => {
      const latePayers = customerData.getLatePayers();
      expect(latePayers).toHaveLength(2);
      expect(latePayers[0].first_name).toBe('John');
      expect(latePayers[1].first_name).toBe('Jane');
    });
  });

  describe('Payment Period', () => {
    test('calculates total payments in a period', () => {
      const total = customerData.getTotalPaymentsInPeriod(
        thirtyOneDaysAgo.toISOString(),
        currentDate.toISOString()
      );
      expect(total).toBe(1200); // 500 + 300 + 400
    });

    test('returns 0 for period with no payments', () => {
      const futureDate = new Date(currentDate);
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const total = customerData.getTotalPaymentsInPeriod(
        currentDate.toISOString(),
        futureDate.toISOString()
      );
      expect(total).toBe(0);
    });
  });

  describe('Payment Statistics', () => {
    test('calculates payment statistics correctly', () => {
      const stats = customerData.getPaymentStatistics();
      expect(stats.totalPayments).toBe(1200);
      expect(stats.averagePayment).toBe(400);
      expect(stats.highestPayment).toBe(500);
      expect(stats.lowestPayment).toBe(300);
    });

    test('handles customers with no payments', () => {
      const noPaymentData = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          purchased: '2019-01-01T00:00:00Z',
          lastpayment: '2020-01-01T00:00:00Z',
          phone: '1234567890',
          make: 'toyota',
          model: 'camry',
          city: 'new york',
          payment_amount: 0,
        },
      ];
      const customerDataNoPayments = new CustomerVehicleData(noPaymentData);
      const stats = customerDataNoPayments.getPaymentStatistics();
      expect(stats.totalPayments).toBe(0);
      expect(stats.averagePayment).toBe(0);
      expect(stats.highestPayment).toBe(0);
      expect(stats.lowestPayment).toBe(0);
    });
  });

  describe('Payment Status', () => {
    test('groups customers by payment status', () => {
      const status = customerData.getCustomersByPaymentStatus();
      expect(status.current).toHaveLength(1);
      expect(status.late).toHaveLength(2);
      expect(status.noPayments).toHaveLength(0);
    });
  });

  describe('Customer Formatting with Payments', () => {
    test('includes payment amount in formatted output', () => {
      const formatted = customerData.formatCustomerWithPayments(testData[0]);
      expect(formatted).toContain('Last Payment Amount: $500.00');
    });

    test('handles customers with no payment amount', () => {
      const noPaymentCustomer = {
        ...testData[0],
        payment_amount: 0,
      };
      const formatted = customerData.formatCustomerWithPayments(noPaymentCustomer);
      expect(formatted).not.toContain('Last Payment Amount');
    });
  });
}); 