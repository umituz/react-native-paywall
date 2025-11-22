/**
 * useCreditsPaywallModal Hook
 * Single Responsibility: Handle credits paywall modal state and operations
 * Integrates credits package with paywall modal
 */

import { useState, useCallback, useMemo } from "react";
import type { ICreditsRepository } from "@umituz/react-native-credits";
import { useCredits } from "@umituz/react-native-credits";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

export interface UseCreditsPaywallModalParams {
  /** User ID */
  userId: string | null;

  /** Credits repository */
  creditsRepository: ICreditsRepository;

  /** Available credit packages */
  packages: CreditsPackage[];

  /** Purchase callback */
  onPurchase: (packageId: string) => Promise<void>;
}

export interface UseCreditsPaywallModalReturn {
  /** Whether modal is visible */
  visible: boolean;

  /** Current credit balance */
  credits: number | null;

  /** Loading state */
  loading: boolean;

  /** Required credits */
  requiredCredits: number;

  /** Show paywall modal */
  showPaywall: (requiredCredits: number) => void;

  /** Hide paywall modal */
  hidePaywall: () => void;

  /** Handle package purchase */
  handlePurchase: (packageId: string) => Promise<void>;

  /** Whether user has enough credits */
  hasEnoughCredits: boolean;
}

/**
 * Hook for credits-based paywall modal
 * Shows paywall when user doesn't have enough credits
 */
export function useCreditsPaywallModal(
  params: UseCreditsPaywallModalParams,
): UseCreditsPaywallModalReturn {
  const { userId, creditsRepository, packages, onPurchase } = params;

  const [visible, setVisible] = useState(false);
  const [requiredCredits, setRequiredCredits] = useState(0);

  const { credits, loading, loadCredits } = useCredits({
    userId,
    repository: creditsRepository,
  });

  const hasEnoughCredits = useMemo(() => {
    return credits !== null && credits >= requiredCredits;
  }, [credits, requiredCredits]);

  const showPaywall = useCallback(
    (required: number) => {
      // Only show paywall if credits are insufficient
      const currentCredits = credits ?? 0;
      if (currentCredits >= required) {
        return;
      }

      setRequiredCredits(required);
      setVisible(true);
    },
    [credits],
  );

  const hidePaywall = useCallback(() => {
    setVisible(false);
  }, []);

  const handlePurchase = useCallback(
    async (packageId: string) => {
      try {
        await onPurchase(packageId);
        await loadCredits();
        // Only hide paywall on success
        hidePaywall();
      } catch (error) {
        // Don't hide paywall on error - let user retry
        // Error is logged/handled by parent component
        throw error;
      }
    },
    [onPurchase, loadCredits, hidePaywall],
  );

  return {
    visible,
    credits,
    loading,
    requiredCredits,
    showPaywall,
    hidePaywall,
    handlePurchase,
    hasEnoughCredits,
  };
}

