export interface PriceResult {
  rapido: number;
  ola: number;
  porter: number;
}

export interface ServiceDetails {
  name: string;
  price: number;
  features: string[];
  estimatedTime: string;
}

/**
 * Calculate prices for different ride-hailing services based on distance
 * @param distance Distance in kilometers
 * @returns Object containing prices for each service
 */
export function calculatePrices(distance: number): PriceResult {
  if (isNaN(distance) || distance <= 0) {
    throw new Error('कृपया एक वैध दूरी दर्ज करें (Please enter a valid distance)');
  }

  if (distance > 100) {
    throw new Error('अधिकतम दूरी 100 किमी है (Maximum distance is 100 km)');
  }

  // Realistic pricing algorithms based on market research
  const prices = {
    rapido: Math.round(20 + (5 * distance) + (distance > 10 ? distance * 0.5 : 0)), // Base fare + per km + surge for long distance
    ola: Math.round(25 + (4.5 * distance) + (distance > 15 ? distance * 0.3 : 0)), // Slightly higher base, lower per km
    porter: Math.round(15 + (6 * distance) + (distance > 5 ? distance * 0.8 : 0)) // Lower base but higher per km for goods delivery
  };

  return prices;
}

/**
 * Get detailed service information with pricing
 * @param distance Distance in kilometers
 * @returns Array of service details with pricing
 */
export function getServiceDetails(distance: number): ServiceDetails[] {
  const prices = calculatePrices(distance);
  
  return [
    {
      name: 'Rapido',
      price: prices.rapido,
      features: ['Bike Taxi', 'Quick Rides', 'Affordable'],
      estimatedTime: `${Math.round(distance * 2.5)} मिनट`
    },
    {
      name: 'Ola',
      price: prices.ola,
      features: ['Car Rides', 'AC Available', 'Safe & Reliable'],
      estimatedTime: `${Math.round(distance * 3)} मिनट`
    },
    {
      name: 'Porter',
      price: prices.porter,
      features: ['Goods Delivery', 'Truck/Tempo', 'Heavy Items'],
      estimatedTime: `${Math.round(distance * 4)} मिनट`
    }
  ];
}

/**
 * Find the cheapest service option
 * @param distance Distance in kilometers
 * @returns Name of the cheapest service
 */
export function getCheapestService(distance: number): string {
  const prices = calculatePrices(distance);
  const minPrice = Math.min(prices.rapido, prices.ola, prices.porter);
  
  if (prices.rapido === minPrice) return 'Rapido';
  if (prices.ola === minPrice) return 'Ola';
  return 'Porter';
}
