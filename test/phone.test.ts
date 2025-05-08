import CustomerVehicleData from '../src/index';

describe('Phone Number Formatting', () => {
  const customerData = new CustomerVehicleData([]);

  test('formats valid 10-digit phone numbers correctly', () => {
    const testCases = [
      { input: '1234567890', expected: '(123) 456-7890' },
      { input: '9876543210', expected: '(987) 654-3210' },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(customerData.formatPhoneNumber(input)).toBe(expected);
    });
  });

  test('handles phone numbers with non-digit characters', () => {
    const testCases = [
      { input: '(123) 456-7890', expected: '(123) 456-7890' },
      { input: '123.456.7890', expected: '(123) 456-7890' },
      { input: '123-456-7890', expected: '(123) 456-7890' },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(customerData.formatPhoneNumber(input)).toBe(expected);
    });
  });

  test('returns original string for invalid phone numbers', () => {
    const testCases = [
      { input: '12345', expected: '12345' },
      { input: '12345678901', expected: '12345678901' },
      { input: 'abc', expected: 'abc' },
      { input: '', expected: '' },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(customerData.formatPhoneNumber(input)).toBe(expected);
    });
  });
});
