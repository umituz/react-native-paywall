/**
 * Subscription Tab Content Component
 * Single Responsibility: Display subscription plans list
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AtomicButton } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import type { PurchasesPackage } from "react-native-purchases";
import { SubscriptionPlanCard } from "./SubscriptionPlanCard";
import { PaywallFeaturesList } from "./PaywallFeaturesList";
import { PaywallLegalFooter } from "./PaywallLegalFooter";

interface SubscriptionTabContentProps {
  packages: PurchasesPackage[];
  selectedPackage: PurchasesPackage | null;
  onSelectPackage: (pkg: PurchasesPackage) => void;
  onPurchase: () => void;
  features?: Array<{ icon: string; text: string }>;
  isLoading?: boolean;
  purchaseButtonText?: string;
  processingText?: string;
}

const isYearlyPackage = (pkg: PurchasesPackage): boolean => {
  const period = pkg.product.subscriptionPeriod;
  return period?.includes("Y") || period?.includes("year") || false;
};

const sortPackages = (packages: PurchasesPackage[]): PurchasesPackage[] => {
  return [...packages].sort((a, b) => {
    const aIsYearly = isYearlyPackage(a);
    const bIsYearly = isYearlyPackage(b);
    if (aIsYearly && !bIsYearly) return -1;
    if (!aIsYearly && bIsYearly) return 1;
    return b.product.price - a.product.price;
  });
};

export const SubscriptionTabContent: React.FC<SubscriptionTabContentProps> =
  React.memo(
    ({
      packages,
      selectedPackage,
      onSelectPackage,
      onPurchase,
      features = [],
      isLoading = false,
      purchaseButtonText,
      processingText,
    }) => {
      const tokens = useAppDesignTokens();
      const { t } = useLocalization();

      const displayPurchaseButtonText = purchaseButtonText || 
        t("paywall.subscribe", "Subscribe");
      const displayProcessingText = processingText || 
        t("paywall.processing", "Processing...");

      const sortedPackages = useMemo(() => sortPackages(packages), [packages]);

      const firstYearlyIndex = useMemo(
        () => sortedPackages.findIndex(isYearlyPackage),
        [sortedPackages],
      );

      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.plansContainer}>
              {sortedPackages.map((pkg, index) => (
                <SubscriptionPlanCard
                  key={pkg.product.identifier}
                  package={pkg}
                  isSelected={
                    selectedPackage?.product.identifier ===
                    pkg.product.identifier
                  }
                  onSelect={() => onSelectPackage(pkg)}
                  isBestValue={index === firstYearlyIndex}
                />
              ))}
            </View>

            {features.length > 0 && (
              <View
                style={[
                  styles.featuresSection,
                  { backgroundColor: tokens.colors.surfaceSecondary },
                ]}
              >
                <PaywallFeaturesList features={features} gap={12} />
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <AtomicButton
              title={isLoading ? displayProcessingText : displayPurchaseButtonText}
              onPress={onPurchase}
              disabled={!selectedPackage || isLoading}
            />
          </View>

          <PaywallLegalFooter />
        </View>
      );
    },
  );

SubscriptionTabContent.displayName = "SubscriptionTabContent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  plansContainer: {
    gap: 12,
    marginBottom: 20,
  },
  featuresSection: {
    borderRadius: 16,
    padding: 16,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
});
