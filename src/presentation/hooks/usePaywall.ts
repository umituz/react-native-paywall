/**
 * Paywall Hook
 * Business logic for paywall functionality
 */

import { useState, useCallback } from "react";
import type { PurchasesPackage } from "react-native-purchases";
import type { PaywallTabType } from "../../domain/entities/PaywallTab";


interface UsePaywallProps {
  initialTab?: PaywallTabType;
  onCreditsPurchase?: (packageId: string) => Promise<void>;
  onSubscriptionPurchase?: (pkg: PurchasesPackage) => Promise<void>;
}

export const usePaywall = ({
  initialTab = "credits",
  onCreditsPurchase,
  onSubscriptionPurchase,
}: UsePaywallProps = {}) => {
  const [activeTab, setActiveTab] = useState<PaywallTabType>(initialTab);
  const [selectedCreditsPackageId, setSelectedCreditsPackageId] = useState<
    string | null
  >(null);
  const [selectedSubscriptionPkg, setSelectedSubscriptionPkg] =
    useState<PurchasesPackage | null>(null);

  const handleTabChange = useCallback((tab: PaywallTabType) => {
    if (__DEV__) {
      console.log("[usePaywall] Tab changed to:", tab);
    }
    setActiveTab(tab);
  }, []);

  const handleCreditsPackageSelect = useCallback((packageId: string) => {
    if (__DEV__) {
      console.log("[usePaywall] Credits package selected:", packageId);
    }
    setSelectedCreditsPackageId(packageId);
  }, []);

  const handleSubscriptionPackageSelect = useCallback((pkg: PurchasesPackage) => {
    if (__DEV__) {
      console.log("[usePaywall] Subscription package selected:", pkg.product.identifier);
    }
    setSelectedSubscriptionPkg(pkg);
  }, []);

  const handleCreditsPurchase = useCallback(async () => {
    if (!selectedCreditsPackageId || !onCreditsPurchase) return;
    
    if (__DEV__) {
      console.log("[usePaywall] Credits purchase initiated:", selectedCreditsPackageId);
    }
    
    try {
      await onCreditsPurchase(selectedCreditsPackageId);
      if (__DEV__) {
        console.log("[usePaywall] Credits purchase completed");
      }
    } catch (error) {
      if (__DEV__) {
        console.error("[usePaywall] Credits purchase failed:", error);
      }
      throw error;
    }
  }, [selectedCreditsPackageId, onCreditsPurchase]);

  const handleSubscriptionPurchase = useCallback(async () => {
    if (!selectedSubscriptionPkg || !onSubscriptionPurchase) return;
    
    if (__DEV__) {
      console.log("[usePaywall] Subscription purchase initiated:", selectedSubscriptionPkg.product.identifier);
    }
    
    try {
      await onSubscriptionPurchase(selectedSubscriptionPkg);
      if (__DEV__) {
        console.log("[usePaywall] Subscription purchase completed");
      }
    } catch (error) {
      if (__DEV__) {
        console.error("[usePaywall] Subscription purchase failed:", error);
      }
      throw error;
    }
  }, [selectedSubscriptionPkg, onSubscriptionPurchase]);

  const resetSelection = useCallback(() => {
    if (__DEV__) {
      console.log("[usePaywall] Selection reset");
    }
    setSelectedCreditsPackageId(null);
    setSelectedSubscriptionPkg(null);
  }, []);

  return {
    activeTab,
    selectedCreditsPackageId,
    selectedSubscriptionPkg,
    handleTabChange,
    handleCreditsPackageSelect,
    handleSubscriptionPackageSelect,
    handleCreditsPurchase,
    handleSubscriptionPurchase,
    resetSelection,
  };
};