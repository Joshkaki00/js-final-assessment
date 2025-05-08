interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  purchased: string;
  lastpayment: string;
  phone: string;
  make: string;
  model: string;
  city: string;
  payment_amount?: number;  // Optional payment amount
}

interface PaymentStatistics {
  totalPayments: number;
  averagePayment: number;
  highestPayment: number;
  lowestPayment: number;
}

interface PaymentStatus {
  current: Customer[];
  late: Customer[];
  noPayments: Customer[];
}

class CustomerVehicleData {
  private customers: Customer[];

  constructor(data: Customer[]) {
    this.customers = data;
  }

  /**
   * Format a name by capitalizing the first letter of each word
   * @param firstName The first name to format
   * @param lastName The last name to format
   * @returns Formatted full name with proper capitalization
   */
  private static formatName(firstName: string, lastName: string): string {
    return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
  }

  /**
   * Format a date as "Month date, Year"
   * @param dateString ISO date string to format
   * @returns Formatted date string
   */
  private static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Format a date as relative time (e.g., "3 months ago")
   * @param dateString ISO date string to format
   * @returns Relative time string
   */
  private static formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMonths = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return `${diffInMonths} months ago`;
  }

  /**
   * Format a phone number as (xxx) xxx-xxxx
   * @param phone Phone number string to format
   * @returns Formatted phone number or original string if invalid
   */
  public formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return phone;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  /**
   * Format a currency amount as USD
   * @param amount Amount to format
   * @returns Formatted currency string
   */
  public static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  /**
   * Format a customer record for display
   * @param customer Customer object to format
   * @returns Formatted string with customer information
   */
  public formatCustomer(customer: Customer): string {
    const make = customer.make.charAt(0).toUpperCase() + customer.make.slice(1);
    const model = customer.model.charAt(0).toUpperCase() + customer.model.slice(1);
    
    return `${CustomerVehicleData.formatName(customer.first_name, customer.last_name)}

${make} ${model}

Purchased: ${CustomerVehicleData.formatDate(customer.purchased)}

Last Payment: ${CustomerVehicleData.formatRelativeTime(customer.lastpayment)}

Phone: ${this.formatPhoneNumber(customer.phone)}

City: ${customer.city.charAt(0).toUpperCase() + customer.city.slice(1)}`;
  }

  /**
   * Get all customers
   */
  public getAllCustomers(): Customer[] {
    return this.customers;
  }

  /**
   * Find customers by vehicle make
   */
  public findByMake(make: string): Customer[] {
    return this.customers.filter((customer) => customer.make.toLowerCase() === make.toLowerCase());
  }

  /**
   * Find customers by vehicle model
   */
  public findByModel(model: string): Customer[] {
    return this.customers.filter((customer) => customer.model.toLowerCase() === model.toLowerCase());
  }

  /**
   * Get customers by city
   */
  public findByCity(city: string): Customer[] {
    return this.customers.filter((customer) => customer.city.toLowerCase() === city.toLowerCase());
  }

  /**
   * Get customers who purchased after a specific date
   */
  public getCustomersAfterDate(date: string): Customer[] {
    const targetDate = new Date(date);
    return this.customers.filter((customer) => new Date(customer.purchased) > targetDate);
  }

  /**
   * Get customers who made their last payment before a specific date
   */
  public getCustomersWithLastPaymentBefore(date: string): Customer[] {
    const targetDate = new Date(date);
    return this.customers.filter((customer) => new Date(customer.lastpayment) < targetDate);
  }

  /**
   * Get statistics about the data
   */
  public getStatistics(): { [key: string]: number } {
    const makes = this.customers.map(c => c.make.toLowerCase());
    const models = this.customers.map(c => c.model.toLowerCase());
    const cities = this.customers.map(c => c.city.toLowerCase());
    
    return {
      totalCustomers: this.customers.length,
      uniqueMakes: [...new Set(makes)].length,
      uniqueModels: [...new Set(models)].length,
      uniqueCities: [...new Set(cities)].length,
      averagePaymentAmount: this.getPaymentStatistics().averagePayment,
    };
  }

  /**
   * Get distribution of vehicle makes
   */
  getMakeDistribution(): Record<string, number> {
    return this.customers.reduce((acc, customer) => {
      acc[customer.make] = (acc[customer.make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Get distribution of cities
   */
  getCityDistribution(): Record<string, number> {
    return this.customers.reduce((acc, customer) => {
      acc[customer.city] = (acc[customer.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Sort customers by a specific field
   */
  sortBy(field: keyof Customer): Customer[] {
    return [...this.customers].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }

  /**
   * Filter customers by multiple criteria
   */
  filterBy(filters: Partial<Customer>): Customer[] {
    return this.customers.filter((customer) => Object.entries(filters).every(([key, value]) => {
      const customerValue = customer[key as keyof Customer];
      if (typeof customerValue === 'string' && typeof value === 'string') {
        return customerValue.toLowerCase() === value.toLowerCase();
      }
      return customerValue === value;
    }));
  }

  /**
   * Get customers with late payments (more than 30 days)
   * @returns Array of customers with late payments
   */
  public getLatePayers(): Customer[] {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.customers.filter(customer => {
      const lastPaymentDate = new Date(customer.lastpayment);
      const paymentAmount = customer.payment_amount || 0;
      return lastPaymentDate < thirtyDaysAgo && paymentAmount > 0;
    });
  }

  /**
   * Get total payments for a specific time period
   * @param startDate Start date of period
   * @param endDate End date of period
   * @returns Total payments in period
   */
  getTotalPaymentsInPeriod(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.customers
      .filter(customer => {
        const paymentDate = new Date(customer.lastpayment);
        return paymentDate >= start && paymentDate <= end;
      })
      .reduce((total, customer) => total + (customer.payment_amount || 0), 0);
  }

  /**
   * Get payment statistics
   * @returns Object containing payment statistics
   */
  getPaymentStatistics(): {
    totalPayments: number;
    averagePayment: number;
    highestPayment: number;
    lowestPayment: number;
  } {
    const payments = this.customers
      .map(c => c.payment_amount || 0)
      .filter(amount => amount > 0);

    if (payments.length === 0) {
      return {
        totalPayments: 0,
        averagePayment: 0,
        highestPayment: 0,
        lowestPayment: 0,
      };
    }

    return {
      totalPayments: payments.reduce((sum, amount) => sum + amount, 0),
      averagePayment: payments.reduce((sum, amount) => sum + amount, 0) / payments.length,
      highestPayment: Math.max(...payments),
      lowestPayment: Math.min(...payments),
    };
  }

  /**
   * Format a customer record for display with payment information
   * @param customer Customer object to format
   * @returns Formatted string with customer information
   */
  formatCustomerWithPayments(customer: Customer): string {
    const baseInfo = this.formatCustomer(customer);
    const paymentInfo = customer.payment_amount 
      ? `\nLast Payment Amount: ${CustomerVehicleData.formatCurrency(customer.payment_amount)}`
      : '';
    
    return `${baseInfo}${paymentInfo}`;
  }

  /**
   * Get customers grouped by payment status
   * @returns Object with customers grouped by payment status
   */
  public getCustomersByPaymentStatus(): PaymentStatus {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const status: PaymentStatus = {
      current: [],
      late: [],
      noPayments: [],
    };

    this.customers.forEach(customer => {
      const lastPaymentDate = new Date(customer.lastpayment);
      const paymentAmount = customer.payment_amount || 0;

      if (paymentAmount === 0) {
        status.noPayments.push(customer);
      } else if (lastPaymentDate < thirtyDaysAgo) {
        status.late.push(customer);
      } else {
        status.current.push(customer);
      }
    });

    return status;
  }
}

export default CustomerVehicleData;
