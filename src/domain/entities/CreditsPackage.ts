/**
 * Credits Package Entity
 * Represents a credit package for purchase
 */

export interface CreditsPackage {
  /** Package ID */
  id: string;

  /** Number of credits */
  credits: number;

  /** Price */
  price: number;

  /** Currency code (e.g., "USD", "EUR", "₺") */
  currency: string;

  /** Optional bonus credits */
  bonus?: number;

  /** Whether this is a popular/best value package */
  popular?: boolean;

  /** Optional badge text */
  badge?: string;

  /** Optional description */
  description?: string;
}

