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
}

module.exports = CustomerVehicleData; 