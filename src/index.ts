/**
 * @umituz/react-native-paywall - Public API
 *
 * Paywall components and screens for React Native apps with subscription management
 *
 * Usage:
 *   import { PaywallScreen, PaywallContent, PaywallPlanCard, PaywallFeatureItem, PaywallFeaturesList } from '@umituz/react-native-paywall';
 */

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { PaywallPlanCard } from "./presentation/components/PaywallPlanCard";
export { PaywallFeatureItem } from "./presentation/components/PaywallFeatureItem";
export { PaywallFeaturesList } from "./presentation/components/PaywallFeaturesList";
export { PaywallContent } from "./presentation/components/PaywallContent";

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { PaywallScreen } from "./presentation/screens/PaywallScreen";

// =============================================================================
// TYPES
// =============================================================================

export type { PurchasesPackage } from "react-native-purchases";

