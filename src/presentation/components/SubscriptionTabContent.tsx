/**
 * Subscription Tab Content Component
 * Single Responsibility: Display subscription plans list
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AtomicButton } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
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
}

export const SubscriptionTabContent: React.FC<SubscriptionTabContentProps> =
  React.memo(
    ({
      packages,
      selectedPackage,
      onSelectPackage,
      onPurchase,
      features = [],
      isLoading = false,
      purchaseButtonText = "Subscribe",
    }) => {
      const tokens = useAppDesignTokens();

      const yearlyPkg = packages.find((p) =>
        p.product.subscriptionPeriod?.includes("Y"),
      );
      const monthlyPkg = packages.find((p) =>
        p.product.subscriptionPeriod?.includes("M"),
      );

      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.plansContainer}>
              {yearlyPkg && (
                <SubscriptionPlanCard
                  package={yearlyPkg}
                  isSelected={
                    selectedPackage?.product.identifier ===
                    yearlyPkg.product.identifier
                  }
                  onSelect={() => onSelectPackage(yearlyPkg)}
                  isBestValue
                />
              )}
              {monthlyPkg && (
                <SubscriptionPlanCard
                  package={monthlyPkg}
                  isSelected={
                    selectedPackage?.product.identifier ===
                    monthlyPkg.product.identifier
                  }
                  onSelect={() => onSelectPackage(monthlyPkg)}
                />
              )}
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
              title={isLoading ? "Processing..." : purchaseButtonText}
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
