/**
 * @umituz/react-native-paywall - Public API
 *
 * Paywall UI components for React Native apps
 * Business logic should be implemented in your app's domain layer
 */

// =============================================================================
// DOMAIN LAYER - Types
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
// TYPES (from peer dependencies)
// =============================================================================

export type { PurchasesPackage } from "react-native-purchases";
