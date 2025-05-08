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
}

class CustomerVehicleData {
  private data: Customer[];

  constructor(data: Customer[]) {
    this.data = data;
  }

  /**
   * Format a name by capitalizing the first letter
   */
  private formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  /**
   * Format a date as "Month date, Year"
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Format a date as relative time (e.g., "3 months ago")
   */
  private formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMonths = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    return `${diffInMonths} months ago`;
  }

  /**
   * Format a phone number as (xxx) xxx-xxxx
   */
  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  }

  /**
   * Format a customer record for display
   */
  formatCustomer(customer: Customer): string {
    return `
${this.formatName(customer.first_name)} ${this.formatName(customer.last_name)}

${this.formatName(customer.make)} ${this.formatName(customer.model)}

Purchased: ${this.formatDate(customer.purchased)}

Last Payment: ${this.formatRelativeTime(customer.lastpayment)}

Phone: ${this.formatPhoneNumber(customer.phone)}

City: ${this.formatName(customer.city)}
`;
  }

  /**
   * Get all customers
   */
  getAllCustomers(): Customer[] {
    return this.data;
  }

  /**
   * Find customers by vehicle make
   */
  findByMake(make: string): Customer[] {
    return this.data.filter(customer => 
      customer.make.toLowerCase() === make.toLowerCase()
    );
  }

  /**
   * Find customers by vehicle model
   */
  findByModel(model: string): Customer[] {
    return this.data.filter(customer => 
      customer.model.toLowerCase() === model.toLowerCase()
    );
  }

  /**
   * Get customers by city
   */
  findByCity(city: string): Customer[] {
    return this.data.filter(customer => 
      customer.city.toLowerCase() === city.toLowerCase()
    );
  }

  /**
   * Get customers who purchased after a specific date
   */
  getCustomersAfterDate(date: string): Customer[] {
    const compareDate = new Date(date);
    return this.data.filter(customer => 
      new Date(customer.purchased) > compareDate
    );
  }

  /**
   * Get customers who made their last payment before a specific date
   */
  getCustomersWithLastPaymentBefore(date: string): Customer[] {
    const compareDate = new Date(date);
    return this.data.filter(customer => 
      new Date(customer.lastpayment) < compareDate
    );
  }

  /**
   * Get statistics about the data
   */
  getStatistics(): {
    totalCustomers: number;
    uniqueMakes: number;
    uniqueModels: number;
    uniqueCities: number;
    makeDistribution: Record<string, number>;
    cityDistribution: Record<string, number>;
    averageDaysSincePurchase: number;
    averageDaysSinceLastPayment: number;
  } {
    const stats = {
      totalCustomers: this.data.length,
      uniqueMakes: [...new Set(this.data.map(c => c.make.toLowerCase()))].length,
      uniqueModels: [...new Set(this.data.map(c => c.model.toLowerCase()))].length,
      uniqueCities: [...new Set(this.data.map(c => c.city.toLowerCase()))].length,
      makeDistribution: this.getMakeDistribution(),
      cityDistribution: this.getCityDistribution(),
      averageDaysSincePurchase: this.getAverageDaysSincePurchase(),
      averageDaysSinceLastPayment: this.getAverageDaysSinceLastPayment()
    };
    return stats;
  }

  /**
   * Get distribution of vehicle makes
   */
  getMakeDistribution(): Record<string, number> {
    return this.data.reduce((acc, customer) => {
      const make = customer.make.toLowerCase();
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Get distribution of cities
   */
  getCityDistribution(): Record<string, number> {
    return this.data.reduce((acc, customer) => {
      const city = customer.city.toLowerCase();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Get average days since purchase
   */
  getAverageDaysSincePurchase(): number {
    const now = new Date();
    const totalDays = this.data.reduce((sum, customer) => {
      const purchaseDate = new Date(customer.purchased);
      return sum + Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    }, 0);
    return Math.floor(totalDays / this.data.length);
  }

  /**
   * Get average days since last payment
   */
  getAverageDaysSinceLastPayment(): number {
    const now = new Date();
    const totalDays = this.data.reduce((sum, customer) => {
      const lastPaymentDate = new Date(customer.lastpayment);
      return sum + Math.floor((now.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24));
    }, 0);
    return Math.floor(totalDays / this.data.length);
  }

  /**
   * Sort customers by a specific field
   */
  sortBy(field: keyof Customer, ascending = true): Customer[] {
    return [...this.data].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      if (field === 'purchased' || field === 'lastpayment') {
        valueA = new Date(valueA as string).getTime();
        valueB = new Date(valueB as string).getTime();
      }

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = (valueB as string).toLowerCase();
      }

      if (valueA < valueB) return ascending ? -1 : 1;
      if (valueA > valueB) return ascending ? 1 : -1;
      return 0;
    });
  }

  /**
   * Filter customers by multiple criteria
   */
  filterBy(criteria: Partial<Customer>): Customer[] {
    return this.data.filter(customer => {
      return Object.entries(criteria).every(([key, value]) => {
        const field = key as keyof Customer;
        if (field === 'purchased' || field === 'lastpayment') {
          const customerDate = new Date(customer[field] as string);
          const compareDate = new Date(value as string);
          return customerDate >= compareDate;
        }
        return (customer[field] as string).toLowerCase().includes((value as string).toLowerCase());
      });
    });
  }
}

export default CustomerVehicleData; 