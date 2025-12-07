/**
 * Credits Tab Content Component
 * Single Responsibility: Display credits packages list
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { CreditsPackageCard } from "./CreditsPackageCard";
import { PaywallLegalFooter } from "./PaywallLegalFooter";
import type { CreditsPackage } from "../../domain/entities/CreditsPackage";

interface CreditsTabContentProps {
  packages: CreditsPackage[];
  selectedPackageId: string | null;
  onSelectPackage: (packageId: string) => void;
  onPurchase: () => void;
  currentCredits: number;
  requiredCredits?: number;
  isLoading?: boolean;
  purchaseButtonText?: string;
}

export const CreditsTabContent: React.FC<CreditsTabContentProps> = React.memo(
  ({
    packages,
    selectedPackageId,
    onSelectPackage,
    onPurchase,
    currentCredits,
    requiredCredits,
    isLoading = false,
    purchaseButtonText = "Purchase",
  }) => {
    const tokens = useAppDesignTokens();

    const needsCredits = requiredCredits && requiredCredits > currentCredits;

    return (
      <View style={styles.container}>
        {needsCredits && (
          <View
            style={[
              styles.infoCard,
              { backgroundColor: tokens.colors.surfaceSecondary },
            ]}
          >
            <AtomicText
              type="bodyMedium"
              style={{ color: tokens.colors.textSecondary }}
            >
              You need {requiredCredits} credits. You have {currentCredits}.
            </AtomicText>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.packagesContainer}>
            {packages.map((pkg) => (
              <CreditsPackageCard
                key={pkg.id}
                package={pkg}
                isSelected={selectedPackageId === pkg.id}
                onSelect={() => onSelectPackage(pkg.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AtomicButton
            title={isLoading ? "Processing..." : purchaseButtonText}
            onPress={onPurchase}
            disabled={!selectedPackageId || isLoading}
          />
        </View>

        <PaywallLegalFooter />
      </View>
    );
  },
);

CreditsTabContent.displayName = "CreditsTabContent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  packagesContainer: {
    gap: 12,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
});
