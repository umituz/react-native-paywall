/**
 * @umituz/react-native-paywall - Public API
 *
 * Paywall components for React Native apps with credits and subscription support
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { CreditsPackage } from "./domain/entities/CreditsPackage";
export type { SubscriptionPlan } from "./domain/entities/SubscriptionPlan";
export type { PaywallTabType, PaywallTab } from "./domain/entities/PaywallTab";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { PaywallModal } from "./presentation/components/PaywallModal";
export { PaywallHeader } from "./presentation/components/PaywallHeader";
export { PaywallTabBar } from "./presentation/components/PaywallTabBar";
export { CreditsTabContent } from "./presentation/components/CreditsTabContent";
export { SubscriptionTabContent } from "./presentation/components/SubscriptionTabContent";
export { CreditsPackageCard } from "./presentation/components/CreditsPackageCard";
export { SubscriptionPlanCard } from "./presentation/components/SubscriptionPlanCard";
export { PaywallFeatureItem } from "./presentation/components/PaywallFeatureItem";
export { PaywallFeaturesList } from "./presentation/components/PaywallFeaturesList";
export { PaywallLegalFooter } from "./presentation/components/PaywallLegalFooter";

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
// TYPES (from peer dependencies)
// =============================================================================

export type { PurchasesPackage } from "react-native-purchases";
