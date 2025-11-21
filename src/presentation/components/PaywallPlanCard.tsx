/**
 * Paywall Plan Card Component
 * Displays a subscription plan with selection state
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import type { PurchasesPackage } from "react-native-purchases";
import { AtomicText, AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { formatPrice } from "@umituz/react-native-subscription";

interface PaywallPlanCardProps {
  pkg: PurchasesPackage | null;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
  isGuest?: boolean;
  guestPrice?: string;
  guestPeriod?: "monthly" | "yearly";
}

export const PaywallPlanCard: React.FC<PaywallPlanCardProps> = ({
  pkg,
  isSelected,
  onSelect,
  isBestValue = false,
  isGuest = false,
  guestPrice,
  guestPeriod,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  // Guest mode: use static pricing
  if (isGuest && guestPrice && guestPeriod) {
    const isYearly = guestPeriod === "yearly";
    const price = guestPrice;
    const yearlyMonthlyEquivalent = isYearly
      ? `$${(parseFloat(guestPrice.replace("$", "")) / 12).toFixed(2)}`
      : null;

    return (
      <View
        style={[
          styles.planCardContainer,
          isSelected && {
            borderColor: tokens.colors.primary,
            borderWidth: 2,
          },
        ]}
      >
        <AtomicCard
          style={[
            styles.planCard,
            {
              backgroundColor: tokens.colors.card,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          {isBestValue && (
            <View
              style={[
                styles.bestValueBadge,
                { backgroundColor: tokens.colors.primary },
              ]}
            >
              <AtomicText type="labelSmall" style={styles.bestValueText}>
                {t("subscription.plans.bestValue")}
              </AtomicText>
            </View>
          )}

          <View style={styles.planContent}>
            <View style={styles.planLeft}>
              <View
                style={[
                  styles.radioButton,
                  {
                    borderColor: isSelected
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  },
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      styles.radioInner,
                      { backgroundColor: tokens.colors.primary },
                    ]}
                  />
                )}
              </View>
              <View style={styles.planTextContainer}>
                <AtomicText
                  type="titleMedium"
                  style={[styles.planTitle, { color: tokens.colors.text }]}
                >
                  {isYearly
                    ? t("subscription.plans.yearly")
                    : t("subscription.plans.monthly")}
                </AtomicText>
                {isYearly && (
                  <AtomicText
                    type="bodyMedium"
                    style={[
                      styles.planPeriod,
                      { color: tokens.colors.textSecondary },
                    ]}
                  >
                    12 mo • {price}
                  </AtomicText>
                )}
              </View>
            </View>

            <View style={styles.planRight}>
              <AtomicText
                variant="h3"
                style={[styles.planPrice, { color: tokens.colors.text }]}
              >
                {isYearly && yearlyMonthlyEquivalent
                  ? `${yearlyMonthlyEquivalent}/mo`
                  : price}
              </AtomicText>
            </View>
          </View>
        </AtomicCard>
      </View>
    );
  }

  // Authenticated mode: use RevenueCat package
  if (!pkg) {
    return null;
  }

  const isYearly = pkg.product.subscriptionPeriod?.includes("Y");
  const price = formatPrice(pkg.product.price, pkg.product.currencyCode);
  // Calculate monthly equivalent for yearly plan
  const yearlyMonthlyEquivalent = isYearly
    ? formatPrice(pkg.product.price / 12, pkg.product.currencyCode)
    : null;

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      style={[
        styles.planCardContainer,
        isSelected && {
          borderColor: tokens.colors.primary,
          borderWidth: 2,
        },
      ]}
    >
      <AtomicCard
        style={[
          styles.planCard,
          {
            backgroundColor: tokens.colors.card,
            borderColor: tokens.colors.border,
          },
        ]}
      >
        {isBestValue && (
          <View
            style={[
              styles.bestValueBadge,
              { backgroundColor: tokens.colors.primary },
            ]}
          >
            <AtomicText variant="caption" style={styles.bestValueText}>
              {t("subscription.plans.bestValue")}
            </AtomicText>
          </View>
        )}

        <View style={styles.planContent}>
          <View style={styles.planLeft}>
            <View
              style={[
                styles.radioButton,
                {
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.border,
                },
              ]}
            >
              {isSelected && (
                <View
                  style={[
                    styles.radioInner,
                    { backgroundColor: tokens.colors.primary },
                  ]}
                />
              )}
            </View>
            <View style={styles.planTextContainer}>
              <AtomicText
                variant="h3"
                style={[styles.planTitle, { color: tokens.colors.text }]}
              >
                {isYearly
                  ? t("subscription.plans.yearly")
                  : t("subscription.plans.monthly")}
              </AtomicText>
              {isYearly && (
                <AtomicText
                  variant="body"
                  style={[
                    styles.planPeriod,
                    { color: tokens.colors.textSecondary },
                  ]}
                >
                  12 mo • {price}
                </AtomicText>
              )}
            </View>
          </View>

          <View style={styles.planRight}>
            <AtomicText
              variant="h3"
              style={[styles.planPrice, { color: tokens.colors.text }]}
            >
              {isYearly && yearlyMonthlyEquivalent
                ? `${yearlyMonthlyEquivalent}/mo`
                : price}
            </AtomicText>
          </View>
        </View>
      </AtomicCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planCardContainer: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  planCard: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 0,
  },
  bestValueBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bestValueText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
  planContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  planTextContainer: {
    flex: 1,
  },
  planTitle: {
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
    fontSize: 18,
  },
  planPeriod: {
    fontSize: 13,
    marginTop: 2,
  },
  planRight: {
    alignItems: "flex-end",
  },
  planPrice: {
    fontWeight: "700",
    color: "#000000",
    fontSize: 18,
  },
});

