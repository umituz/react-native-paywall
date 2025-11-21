/**
 * Paywall Content Component
 * Main paywall content with plans, features, and CTA
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import type { PurchasesPackage } from "react-native-purchases";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { PaywallPlanCard } from "./PaywallPlanCard";
import { PaywallFeaturesList } from "./PaywallFeaturesList";
import { AuthLegalLinks } from "@umituz/react-native-auth";

interface PaywallContentProps {
  /** RevenueCat packages */
  packages: PurchasesPackage[];
  /** Selected package */
  selectedPackage?: PurchasesPackage;
  /** Callback when package is selected */
  onPackageSelect: (pkg: PurchasesPackage) => void;
  /** Callback when purchase button is pressed */
  onPurchase: () => void;
  /** Whether purchase is loading */
  isLoading?: boolean;
  /** Whether user is a guest */
  isGuest?: boolean;
  /** Callback when sign in is pressed (for guest users) */
  onSignIn?: () => void;
  /** Features list */
  features: Array<{ icon: string; text: string }>;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Purchase button text */
  purchaseButtonText?: string;
  /** Terms text */
  termsText?: string;
  /** Guest monthly price (for guest users) */
  guestMonthlyPrice?: string;
  /** Guest yearly price (for guest users) */
  guestYearlyPrice?: string;
}

export const PaywallContent: React.FC<PaywallContentProps> = ({
  packages,
  selectedPackage,
  onPackageSelect,
  onPurchase,
  isLoading = false,
  isGuest = false,
  onSignIn,
  features,
  title,
  subtitle,
  purchaseButtonText,
  termsText,
  guestMonthlyPrice = "$4.99",
  guestYearlyPrice = "$39.99",
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const monthlyPkg = packages.find((p) =>
    p.product.subscriptionPeriod?.includes("M"),
  );
  const yearlyPkg = packages.find((p) =>
    p.product.subscriptionPeriod?.includes("Y"),
  );

  const displayTitle = title || t("subscription.upgradeTitle");
  const displaySubtitle = subtitle || t("subscription.upgradeSubtitle");
  const displayPurchaseButtonText =
    purchaseButtonText ||
    (isGuest
      ? t("subscription.guestSignIn")
      : isLoading
        ? t("subscription.processing")
        : t("subscription.startPremium"));
  const displayTermsText = termsText || t("subscription.terms");

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleContainer}>
        <AtomicText
          type="headlineLarge"
          style={[styles.mainTitle, { color: tokens.colors.text }]}
        >
          {displayTitle}
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          style={[styles.subtitle, { color: tokens.colors.textSecondary }]}
        >
          {displaySubtitle}
        </AtomicText>
      </View>

      <View style={styles.plansContainer}>
        {/* Yearly Plan */}
        {isGuest ? (
          <>
            {/* Guest: Static Yearly Plan */}
            <PaywallPlanCard
              pkg={null}
              isSelected={true}
              onSelect={() => {}}
              isBestValue
              isGuest={true}
              guestPrice={guestYearlyPrice}
              guestPeriod="yearly"
            />
            {/* Guest: Static Monthly Plan */}
            <PaywallPlanCard
              pkg={null}
              isSelected={false}
              onSelect={() => {}}
              isGuest={true}
              guestPrice={guestMonthlyPrice}
              guestPeriod="monthly"
            />
          </>
        ) : (
          <>
            {yearlyPkg && (
              <PaywallPlanCard
                pkg={yearlyPkg}
                isSelected={
                  selectedPackage?.product.identifier ===
                  yearlyPkg.product.identifier
                }
                onSelect={() => onPackageSelect(yearlyPkg)}
                isBestValue
              />
            )}

            {monthlyPkg && (
              <PaywallPlanCard
                pkg={monthlyPkg}
                isSelected={
                  selectedPackage?.product.identifier ===
                  monthlyPkg.product.identifier
                }
                onSelect={() => onPackageSelect(monthlyPkg)}
              />
            )}
          </>
        )}
      </View>

      {/* Features List */}
      <PaywallFeaturesList
        features={features}
        containerStyle={styles.featuresContainer}
      />

      <AtomicButton
        title={displayPurchaseButtonText}
        onPress={isGuest && onSignIn ? onSignIn : onPurchase}
        disabled={isGuest ? false : isLoading || !selectedPackage}
        style={styles.continueButton}
      />

      {/* Guest sign in message */}
      {isGuest && (
        <AtomicText
          type="bodySmall"
          style={[styles.guestMessage, { color: tokens.colors.textSecondary }]}
        >
          {t("subscription.guestSignInMessage")}
        </AtomicText>
      )}

      {/* Terms */}
      <View style={styles.termsContainer}>
        <AtomicText
          type="labelSmall"
          style={[styles.termsText, { color: tokens.colors.textSecondary }]}
        >
          {displayTermsText}
        </AtomicText>
        <AuthLegalLinks variant="centered" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  titleContainer: {
    marginTop: 0,
    marginBottom: 20,
    paddingTop: 0,
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: 6,
    fontWeight: "700",
    fontSize: 28,
    color: "#000000",
    lineHeight: 34,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 0,
    fontSize: 14,
    color: "#666666",
  },
  plansContainer: {
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  continueButton: {
    marginBottom: 16,
  },
  termsContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  termsText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  guestMessage: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
  },
});

