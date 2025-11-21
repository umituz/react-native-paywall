/**
 * useCreditsPaywall Hook
 * Single Responsibility: Handle credits-based paywall logic
 * Integrates credits package with paywall
 */

import { useMemo } from "react";
import type { ICreditsRepository } from "@umituz/react-native-credits";
import { useCredits } from "@umituz/react-native-credits";

export interface UseCreditsPaywallParams {
  /** User ID */
  userId: string | null;

  /** Credits repository */
  creditsRepository: ICreditsRepository;

  /** Required credits to access feature */
  requiredCredits: number;
}

export interface UseCreditsPaywallReturn {
  /** Current credit balance */
  credits: number | null;

  /** Loading state */
  loading: boolean;

  /** Whether user has enough credits */
  hasEnoughCredits: boolean;

  /** Remaining credits after purchase */
  remainingAfterPurchase: number | null;

  /** Load credits */
  loadCredits: () => Promise<void>;
}

/**
 * Hook for credits-based paywall
 * Shows paywall when user doesn't have enough credits
 */
export function useCreditsPaywall(
  params: UseCreditsPaywallParams,
): UseCreditsPaywallReturn {
  const { userId, creditsRepository, requiredCredits } = params;

  const { credits, loading, loadCredits } = useCredits({
    userId,
    repository: creditsRepository,
  });

  const hasEnoughCredits = useMemo(() => {
    return credits !== null && credits >= requiredCredits;
  }, [credits, requiredCredits]);

  const remainingAfterPurchase = useMemo(() => {
    if (credits === null) {
      return null;
    }
    return Math.max(0, credits - requiredCredits);
  }, [credits, requiredCredits]);

  return {
    credits,
    loading,
    hasEnoughCredits,
    remainingAfterPurchase,
    loadCredits,
  };
}

