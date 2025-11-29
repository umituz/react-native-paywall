/**
 * @umituz/react-native-paywall - Public API
 *
 * Paywall components and screens for React Native apps with subscription management
 *
 * Usage:
 *   import { PaywallScreen, PaywallContent, PaywallPlanCard, PaywallFeatureItem, PaywallFeaturesList } from '@umituz/react-native-paywall';
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { CreditsPackage } from "./domain/entities/CreditsPackage";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { PaywallPlanCard } from "./presentation/components/PaywallPlanCard";
export { PaywallFeatureItem } from "./presentation/components/PaywallFeatureItem";
export { PaywallFeaturesList } from "./presentation/components/PaywallFeaturesList";
export { PaywallContent } from "./presentation/components/PaywallContent";
export { CreditsPackageCard } from "./presentation/components/CreditsPackageCard";
export { CreditsPaywallModal } from "./presentation/components/CreditsPaywallModal";

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { PaywallScreen } from "./presentation/screens/PaywallScreen";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export {
  useCreditsPaywall,
  type UseCreditsPaywallParams,
  type UseCreditsPaywallReturn,
} from "./presentation/hooks/useCreditsPaywall";

export {
  useCreditsPaywallModal,
  type UseCreditsPaywallModalParams,
  type UseCreditsPaywallModalReturn,
} from "./presentation/hooks/useCreditsPaywallModal";

// =============================================================================
// TYPES
// =============================================================================

// Note: PurchasesPackage type is from react-native-purchases peer dependency
// We export it here for convenience, but the package must be installed
// TypeScript will resolve it from node_modules when react-native-purchases is installed
export type { PurchasesPackage } from "react-native-purchases";
