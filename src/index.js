/**
 * Customer Vehicle Data Library
 * A library for processing and analyzing customer and vehicle data
 */

class CustomerVehicleData {
  constructor(data) {
    this.data = data;
  }

  /**
   * Get all customers
   * @returns {Array} Array of all customers
   */
  getAllCustomers() {
    return this.data;
  }

  /**
   * Find customers by vehicle make
   * @param {string} make - The vehicle make to search for
   * @returns {Array} Array of customers with matching vehicle make
   */
  findByMake(make) {
    return this.data.filter(customer => 
      customer.make.toLowerCase() === make.toLowerCase()
    );
  }

  /**
   * Find customers by vehicle model
   * @param {string} model - The vehicle model to search for
   * @returns {Array} Array of customers with matching vehicle model
   */
  findByModel(model) {
    return this.data.filter(customer => 
      customer.model.toLowerCase() === model.toLowerCase()
    );
  }

  /**
   * Get customers by city
   * @param {string} city - The city to search for
   * @returns {Array} Array of customers in the specified city
   */
  findByCity(city) {
    return this.data.filter(customer => 
      customer.city.toLowerCase() === city.toLowerCase()
    );
  }

  /**
   * Get customers who purchased after a specific date
   * @param {string} date - The date to compare against (ISO format)
   * @returns {Array} Array of customers who purchased after the date
   */
  getCustomersAfterDate(date) {
    const compareDate = new Date(date);
    return this.data.filter(customer => 
      new Date(customer.purchased) > compareDate
    );
  }

  /**
   * Get customers who made their last payment before a specific date
   * @param {string} date - The date to compare against (ISO format)
   * @returns {Array} Array of customers who made their last payment before the date
   */
  getCustomersWithLastPaymentBefore(date) {
    const compareDate = new Date(date);
    return this.data.filter(customer => 
      new Date(customer.lastpayment) < compareDate
    );
  }

  /**
   * Get statistics about the data
   * @returns {Object} Object containing various statistics
   */
  getStatistics() {
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
   * @returns {Object} Object with make counts
   */
  getMakeDistribution() {
    return this.data.reduce((acc, customer) => {
      const make = customer.make.toLowerCase();
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Get distribution of cities
   * @returns {Object} Object with city counts
   */
  getCityDistribution() {
    return this.data.reduce((acc, customer) => {
      const city = customer.city.toLowerCase();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Get average days since purchase
   * @returns {number} Average days since purchase
   */
  getAverageDaysSincePurchase() {
    const now = new Date();
    const totalDays = this.data.reduce((sum, customer) => {
      const purchaseDate = new Date(customer.purchased);
      return sum + Math.floor((now - purchaseDate) / (1000 * 60 * 60 * 24));
    }, 0);
    return Math.floor(totalDays / this.data.length);
  }

  /**
   * Get average days since last payment
   * @returns {number} Average days since last payment
   */
  getAverageDaysSinceLastPayment() {
    const now = new Date();
    const totalDays = this.data.reduce((sum, customer) => {
      const lastPaymentDate = new Date(customer.lastpayment);
      return sum + Math.floor((now - lastPaymentDate) / (1000 * 60 * 60 * 24));
    }, 0);
    return Math.floor(totalDays / this.data.length);
  }

  /**
   * Sort customers by a specific field
   * @param {string} field - Field to sort by
   * @param {boolean} ascending - Sort direction
   * @returns {Array} Sorted array of customers
   */
  sortBy(field, ascending = true) {
    return [...this.data].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      // Handle date fields
      if (field === 'purchased' || field === 'lastpayment') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      // Handle string fields
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return ascending ? -1 : 1;
      if (valueA > valueB) return ascending ? 1 : -1;
      return 0;
    });
  }

  /**
   * Filter customers by multiple criteria
   * @param {Object} criteria - Object containing filter criteria
   * @returns {Array} Filtered array of customers
   */
  filterBy(criteria) {
    return this.data.filter(customer => {
      return Object.entries(criteria).every(([key, value]) => {
        if (key === 'purchased' || key === 'lastpayment') {
          const customerDate = new Date(customer[key]);
          const compareDate = new Date(value);
          return customerDate >= compareDate;
        }
        return customer[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  }
}

module.exports = CustomerVehicleData; 