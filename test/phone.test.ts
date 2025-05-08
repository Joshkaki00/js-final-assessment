import CustomerVehicleData from '../src/index';

describe('Phone Number Formatting', () => {
  const customerData = new CustomerVehicleData([]);

  test('formats valid 10-digit phone numbers', () => {
    const testCases = [
      { input: '1234567890', expected: '(123) 456-7890' },
      { input: '4155448375', expected: '(415) 544-8375' },
      { input: '9999999999', expected: '(999) 999-9999' }
    ];

    testCases.forEach(({ input, expected }) => {
      const formatted = customerData['formatPhoneNumber'](input);
      expect(formatted).toBe(expected);
    });
  });

  test('handles phone numbers with non-digit characters', () => {
    const testCases = [
      { input: '123-456-7890', expected: '(123) 456-7890' },
      { input: '(415) 544-8375', expected: '(415) 544-8375' },
      { input: '123.456.7890', expected: '(123) 456-7890' }
    ];

    testCases.forEach(({ input, expected }) => {
      const formatted = customerData['formatPhoneNumber'](input);
      expect(formatted).toBe(expected);
    });
  });

  test('returns original string for invalid phone numbers', () => {
    const testCases = [
      '123', // too short
      '12345678901', // too long
      'abc', // non-numeric
      '', // empty string
      '123-456-789' // invalid format
    ];

    testCases.forEach(input => {
      const formatted = customerData['formatPhoneNumber'](input);
      expect(formatted).toBe(input);
    });
  });
}); 