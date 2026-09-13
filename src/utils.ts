import { Product } from './types';

/**
 * Calculates the dynamic unit price of a product based on the quantity requested,
 * matching the official pricing tiers precisely (1-12, 13-50, 51+ or legacy tiers).
 */
export function getProductTierPrice(product: Product, quantity: number): number {
  if (!product.priceTiers) return product.price;

  if (product.priceTiers['51+'] !== undefined) {
    if (quantity >= 51) {
      return product.priceTiers['51+'];
    } else if (quantity >= 13) {
      return product.priceTiers['13-50'] ?? product.priceTiers['51+'];
    } else {
      return product.priceTiers['1-12'] ?? product.price;
    }
  }

  if (quantity >= 300) {
    return product.priceTiers['300+'] ?? product.price;
  } else if (quantity >= 100) {
    return product.priceTiers['100-299'] ?? product.price;
  } else if (quantity >= 12) {
    return product.priceTiers['12-99'] ?? product.price;
  } else {
    return product.priceTiers['1-6'] ?? product.price;
  }
}

/**
 * Returns the lowest tier price (typically 51+ or 300+ volume) for display badges like "Desde $..."
 */
export function getLowestTierPrice(product: Product): number {
  if (!product.priceTiers) return product.price;
  if (product.priceTiers['51+'] !== undefined) return product.priceTiers['51+'];
  if (product.priceTiers['300+'] !== undefined) return product.priceTiers['300+'];
  if (product.priceTiers['100-299'] !== undefined) return product.priceTiers['100-299'];
  return product.price;
}

/**
 * Calculates the unit cost for chest embroidery based on official quantity tiers:
 * - 1 to 12 units: $45.00 MXN
 * - 13 to 50 units: $38.00 MXN
 * - 51+ units: $33.00 MXN
 */
export function getChestEmbroideryPrice(quantity: number): number {
  if (quantity >= 51) return 33.00;
  if (quantity >= 13) return 38.00;
  return 45.00;
}

/**
 * Calculates the unit cost for back embroidery based on official quantity tiers:
 * - 1 to 12 units: $80.00 MXN
 * - 13 to 50 units: $72.00 MXN
 * - 51+ units: $65.00 MXN
 */
export function getBackEmbroideryPrice(quantity: number): number {
  if (quantity >= 51) return 65.00;
  if (quantity >= 13) return 72.00;
  return 80.00;
}

/**
 * Format a number to currency string (MXN)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * Optimizes image URLs (Cloudinary & Unsplash) on the fly with modern formats and smart compression
 */
export function getOptimizedImageUrl(url: string | undefined, width?: number): string {
  if (!url) return '';
  
  // Cloudinary optimization
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) {
      return url;
    }
    const params = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
    return url.replace('/image/upload/', `/image/upload/${params}/`);
  }
  
  // Unsplash optimization
  if (url.includes('images.unsplash.com')) {
    if (!url.includes('auto=format')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}auto=format&fit=crop&q=80${width ? `&w=${width}` : ''}`;
    }
  }

  return url;
}
