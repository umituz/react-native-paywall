/**
 * useCreditsPaywall Hook
 * Simple hook for credits-based paywall logic
 * Uses new constant-based credits system
 */

import { useMemo } from "react";
import { useCredits } from "@umituz/react-native-credits";

export interface UseCreditsPaywallParams {
  /** Required credits to access feature */
  requiredCredits: number;
}

export interface UseCreditsPaywallReturn {
  /** Current credit balance */
  credits: number;

  /** Loading state */
  loading: boolean;

  /** Whether user has enough credits */
  hasEnoughCredits: boolean;

  /** Remaining credits after purchase */
  remainingAfterPurchase: number;

  /** Use credits for a feature */
  useCredits: (cost: number, feature: string) => boolean;
}

/**
 * Hook for credits-based paywall
 * Shows paywall when user doesn't have enough credits
 */
export function useCreditsPaywall(
  params: UseCreditsPaywallParams
): UseCreditsPaywallReturn {
  const { requiredCredits } = params;

  const {
    credits,
    loading,
    canAfford,
    useCredits: useCreditsForFeature,
  } = useCredits();

  const hasEnoughCredits = useMemo(() => {
    return canAfford(requiredCredits);
  }, [canAfford, requiredCredits]);

  const remainingAfterPurchase = useMemo(() => {
    return Math.max(0, credits - requiredCredits);
  }, [credits, requiredCredits]);

  return {
    credits,
    loading,
    hasEnoughCredits,
    remainingAfterPurchase,
    useCredits: useCreditsForFeature,
  };
}
