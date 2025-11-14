/**
 * Paywall Screen
 * Generic paywall screen for subscription management
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { PurchasesPackage } from "react-native-purchases";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  AtomicCard,
} from "@umituz/react-native-design-system";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { PaywallPlanCard } from "../components/PaywallPlanCard";
import { PaywallFeaturesList } from "../components/PaywallFeaturesList";
import { AuthLegalLinks } from "@umituz/react-native-auth";

interface PaywallScreenProps {
  /** RevenueCat packages (optional, for authenticated users) */
  packages?: PurchasesPackage[];
  /** Selected package */
  selectedPackage?: PurchasesPackage;
  /** Callback when package is selected */
  onPackageSelect?: (pkg: PurchasesPackage) => void;
  /** Callback when purchase button is pressed */
  onPurchase?: () => void;
  /** Whether user is a guest */
  isGuest?: boolean;
  /** Guest monthly price (for guest users) */
  guestMonthlyPrice?: string;
  /** Guest yearly price (for guest users) */
  guestYearlyPrice?: string;
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
  /** Callback when sign in is pressed (for guest users) */
  onSignIn?: () => void;
  /** Whether purchase is loading */
  isLoading?: boolean;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({
  packages = [],
  selectedPackage,
  onPackageSelect,
  onPurchase,
  isGuest = false,
  guestMonthlyPrice = "$4.99",
  guestYearlyPrice = "$39.99",
  features,
  title,
  subtitle,
  purchaseButtonText,
  termsText,
  onSignIn,
  isLoading = false,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const yearlyMonthlyEquivalent = `$${(
    parseFloat(guestYearlyPrice.replace("$", "")) / 12
  ).toFixed(2)}`;

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

  const handlePurchase = () => {
    if (isGuest && onSignIn) {
      onSignIn();
    } else if (onPurchase) {
      onPurchase();
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: tokens.colors.background }]}
    >
      <SafeAreaView edges={["top"]} style={styles.safeAreaTop}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <AtomicIcon
              name="X"
              size={24}
              customColor={tokens.colors.text}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <AtomicText
            variant="h1"
            style={[styles.mainTitle, { color: tokens.colors.text }]}
          >
            {displayTitle}
          </AtomicText>

          <AtomicText
            variant="body"
            style={[styles.subtitle, { color: tokens.colors.textSecondary }]}
          >
            {displaySubtitle}
          </AtomicText>
        </View>

        <View style={styles.plansContainer}>
          {/* Yearly Plan */}
          {isGuest ? (
            <>
              <PaywallPlanCard
                pkg={null}
                isSelected={selectedPlan === "yearly"}
                onSelect={() => setSelectedPlan("yearly")}
                isBestValue
                isGuest={true}
                guestPrice={guestYearlyPrice}
                guestPeriod="yearly"
              />
              <PaywallPlanCard
                pkg={null}
                isSelected={selectedPlan === "monthly"}
                onSelect={() => setSelectedPlan("monthly")}
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
                  onSelect={() => {
                    if (onPackageSelect) {
                      onPackageSelect(yearlyPkg);
                    }
                  }}
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
                  onSelect={() => {
                    if (onPackageSelect) {
                      onPackageSelect(monthlyPkg);
                    }
                  }}
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
          onPress={handlePurchase}
          disabled={isGuest ? false : isLoading || !selectedPackage}
          style={styles.continueButton}
        />

        {/* Guest sign in message */}
        {isGuest && (
          <AtomicText
            variant="bodySmall"
            style={[
              styles.guestMessage,
              { color: tokens.colors.textSecondary },
            ]}
          >
            {t("subscription.guestSignInMessage")}
          </AtomicText>
        )}

        {/* Terms */}
        <View style={styles.termsContainer}>
          <AtomicText
            variant="caption"
            style={[styles.termsText, { color: tokens.colors.textSecondary }]}
          >
            {displayTermsText}
          </AtomicText>
          <AuthLegalLinks variant="centered" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaTop: {
    backgroundColor: "transparent",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "flex-end",
  },
  closeButton: {
    padding: 8,
  },
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

