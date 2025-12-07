/**
 * Subscription Plan Card Component
 * Single Responsibility: Display a subscription plan option
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import type { PurchasesPackage } from "react-native-purchases";
import { AtomicText } from "@umituz/react-native-design-system-atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { formatPrice } from "@umituz/react-native-subscription";
import { useLocalization } from "@umituz/react-native-localization";

interface SubscriptionPlanCardProps {
  package: PurchasesPackage;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> =
  React.memo(({ package: pkg, isSelected, onSelect, isBestValue = false }) => {
    const tokens = useAppDesignTokens();
    const { t } = useLocalization();

    const isYearly = pkg.product.subscriptionPeriod?.includes("Y");
    const price = formatPrice(pkg.product.price, pkg.product.currencyCode);
    const monthlyEquivalent = isYearly
      ? formatPrice(pkg.product.price / 12, pkg.product.currencyCode)
      : null;

    return (
      <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.8}
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? tokens.colors.primaryLight
              : tokens.colors.surface,
            borderColor: isSelected
              ? tokens.colors.primary
              : tokens.colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
      >
        {isBestValue && (
          <View
            style={[styles.badge, { backgroundColor: tokens.colors.primary }]}
          >
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.onPrimary, fontWeight: "600" }}
            >
              {t("paywall.bestValue", "Best Value")}
            </AtomicText>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.radio,
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
            <View style={styles.textContainer}>
              <AtomicText
                type="titleMedium"
                style={[styles.title, { color: tokens.colors.textPrimary }]}
              >
                {isYearly
                  ? t("paywall.yearly", "Yearly")
                  : t("paywall.monthly", "Monthly")}
              </AtomicText>
              {isYearly && (
                <AtomicText
                  type="bodySmall"
                  style={{ color: tokens.colors.textSecondary }}
                >
                  12 mo • {price}
                </AtomicText>
              )}
            </View>
          </View>

          <View style={styles.rightSection}>
            <AtomicText
              type="titleMedium"
              style={[styles.price, { color: tokens.colors.textPrimary }]}
            >
              {isYearly && monthlyEquivalent
                ? `${monthlyEquivalent}/mo`
                : price}
            </AtomicText>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

SubscriptionPlanCard.displayName = "SubscriptionPlanCard";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radio: {
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
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    marginBottom: 2,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  price: {
    fontWeight: "700",
  },
});
