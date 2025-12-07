/**
 * useCreditsPaywallModal Hook
 * Handle credits paywall modal state and operations
 * Uses new constant-based credits system
 */

import { useState, useCallback, useMemo } from "react";
import { useCredits } from "@umituz/react-native-credits";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

export interface UseCreditsPaywallModalParams {
  /** Available credit packages */
  packages: CreditsPackage[];

  /** Purchase callback - receives package, should add credits on success */
  onPurchase: (pkg: CreditsPackage) => Promise<void>;
}

export interface UseCreditsPaywallModalReturn {
  /** Whether modal is visible */
  visible: boolean;

  /** Current credit balance */
  credits: number;

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
  params: UseCreditsPaywallModalParams
): UseCreditsPaywallModalReturn {
  const { packages, onPurchase } = params;

  const [visible, setVisible] = useState(false);
  const [requiredCredits, setRequiredCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { credits, loading, canAfford } = useCredits();

  const hasEnoughCredits = useMemo(() => {
    return canAfford(requiredCredits);
  }, [canAfford, requiredCredits]);

  const showPaywall = useCallback(
    (required: number) => {
      if (canAfford(required)) {
        return;
      }

      setRequiredCredits(required);
      setVisible(true);
    },
    [canAfford]
  );

  const hidePaywall = useCallback(() => {
    setVisible(false);
  }, []);

  const handlePurchase = useCallback(
    async (packageId: string) => {
      const pkg = packages.find((p) => p.id === packageId);
      if (!pkg) {
        throw new Error(`Package not found: ${packageId}`);
      }

      setIsLoading(true);
      try {
        await onPurchase(pkg);
        hidePaywall();
      } finally {
        setIsLoading(false);
      }
    },
    [packages, onPurchase, hidePaywall]
  );

  return {
    visible,
    credits,
    loading: loading || isLoading,
    requiredCredits,
    showPaywall,
    hidePaywall,
    handlePurchase,
    hasEnoughCredits,
  };
}
